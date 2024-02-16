import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { GradeLogsResponseDto } from './dtos/grade-logs.response.dto';
import { StudentStatisticResponseDto } from './dtos/student-statistic.response.dto';

@Injectable()
export class StudentsGradesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Сохранение полученных данных об оценках и студентах в базу данных
  async saveStudentAndGrade(studentData: any, subject: string, grade: number) {
    try {
      await this.prismaService.upsertStudent(studentData);

      await this.prismaService.createGrade(
        studentData.personalCode,
        subject,
        grade,
      );
    } catch (error) {
      throw new HttpException('ERR_VALIDATION_FAIL', HttpStatus.BAD_REQUEST);
    }
  }

  async getGradesLog(
    page: number,
    limit: number,
  ): Promise<GradeLogsResponseDto[]> {
    try {
      const gradesWithStudents =
        await this.prismaService.findGradesWithStudentInfo(page, limit);
      return gradesWithStudents.map((grade) => ({
        date: grade.createdAt.toISOString(),
        subject: grade.subject,
        grade: grade.grade,
        student: {
          personalCode: grade.student.personalCode,
          name: grade.student.name,
          lastName: grade.student.lastName,
        },
      }));
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getStudentStatistic(
    personalCode: string,
  ): Promise<StudentStatisticResponseDto> {
    try {
      const [student, grades] = await Promise.all([
        this.prismaService.findStudentByPersonalCode(personalCode),
        this.prismaService.findGradesByPersonalCode(personalCode),
      ]);

      const gradesBySubject = grades.reduce((acc, curr) => {
        if (!acc[curr.subject]) {
          acc[curr.subject] = [];
        }
        acc[curr.subject].push(curr.grade);
        return acc;
      }, {});

      const statistic = Object.keys(gradesBySubject).map((subject) => {
        const subjectGrades = gradesBySubject[subject];
        const totalGrades = subjectGrades.length;
        const maxGrade = Math.max(...subjectGrades);
        const minGrade = Math.min(...subjectGrades);
        const sum = subjectGrades.reduce((acc, curr) => acc + curr, 0);
        const avgGrade = totalGrades > 0 ? sum / totalGrades : 0;

        return {
          subject,
          maxGrade,
          minGrade,
          avgGrade,
          totalGrades,
        };
      });

      return {
        student: {
          personalCode: student.personalCode,
          name: student.name,
          lastName: student.lastName,
        },
        statistic: statistic,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
