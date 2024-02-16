import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connect, StringCodec } from 'nats';
import * as process from 'process';

import { StudentsGradesService } from '../students-grades/students-grades.service';
import { NatsTopicsEnum } from './constants/nats-topics.enum';

@Injectable()
export class NatsService {
  private nc;

  constructor(private readonly studentsGradesService: StudentsGradesService) {
    this.connectToNATS().then(() => console.log('NATS connection successful!'));
  }

  private async connectToNATS() {
    try {
      this.nc = await connect({ servers: process.env.NATS_URL });
      await this.subscribeToTopic();
    } catch (error) {
      console.error('Failed to connect to NATS:', error);
    }
  }

  private async subscribeToTopic() {
    try {
      const sub = this.nc.subscribe(NatsTopicsEnum.STUDENT_GRADES_UPDATED);
      for await (const m of sub) {
        const responseString = m.data.toString();
        const response = JSON.parse(responseString);
        console.log('Data received:\n', response);

        const { personalCode, subject, grade } = response.data;

        const studentData = await this.sendGetRequest(personalCode);

        await this.studentsGradesService.saveStudentAndGrade(
          studentData,
          subject,
          grade,
        );
      }
      console.log('Subscription closed');
    } catch (error) {
      throw new HttpException('ERR_WRONG_FORMAT', HttpStatus.BAD_REQUEST);
    }
  }

  async sendGetRequest(personalCode: string, timeout: number = 1000) {
    try {
      const response = await this.nc.request(
        NatsTopicsEnum.GET_STUDENT_INFO,
        StringCodec().encode(JSON.stringify({ personalCode })),
        { timeout },
      );

      const responseData = JSON.parse(response.data);
      return responseData.data;
    } catch (error) {
      throw new HttpException('ERR_ENTITY_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
