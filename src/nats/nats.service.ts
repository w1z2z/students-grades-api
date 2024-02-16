import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connect, ConnectionOptions, Msg } from 'nats';
import * as process from 'process';

import { StudentsGradesService } from '../students-grades/students-grades.service';
@Injectable()
export class NatsService {
  private natsClient: any;

  constructor(private readonly studentsGradesService: StudentsGradesService) {
    this.connectToNats();
  }

  async connectToNats() {
    try {
      const servers = [process.env.NATS_URL];
      const opts: ConnectionOptions = { servers };
      this.natsClient = await connect(opts);
      console.log('Connected to NATS server');
      this.subscribeToGradedTopic();
    } catch (error) {
      console.error('Error connecting to NATS server:', error);
    }
  }

  subscribeToGradedTopic() {
    try {
      this.natsClient.subscribe('students.v1.graded', async (msg: Msg) => {
        const data = JSON.parse(msg.data.toString());
        const { personalCode, subject, grade } = data;

        const studentData = await this.sendGetRequest(personalCode);

        await this.studentsGradesService.saveStudentAndGrade(
          studentData,
          subject,
          grade,
        );
      });
    } catch (error) {
      throw new HttpException('ERR_WRONG_FORMAT', HttpStatus.BAD_REQUEST);
    }
  }

  async sendGetRequest(personalCode: string) {
    try {
      const response = await this.natsClient.request(
        'students.v1.get',
        JSON.stringify({ personalCode }),
      );
      const responseData = JSON.parse(response.data.toString());
      return responseData.data;
    } catch (error) {
      throw new HttpException('ERR_ENTITY_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }
}
