import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor(private prisma: PrismaClient) {}

  async upsertStudent(studentData: any) {
    return this.prisma.student.upsert({
      where: { personalCode: studentData.personalCode },
      update: { name: studentData.name, lastName: studentData.lastName },
      create: {
        personalCode: studentData.personalCode,
        name: studentData.name,
        lastName: studentData.lastName,
      },
    });
  }

  async createGrade(
    studentPersonalCode: string,
    subject: string,
    grade: number,
  ) {
    return this.prisma.grade.create({
      data: {
        studentPersonalCode,
        subject,
        grade,
      },
    });
  }

  async findGradesWithStudentInfo(page: number, limit: number) {
    return this.prisma.grade.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'asc' },
      include: { student: true },
    });
  }

  async findStudentByPersonalCode(personalCode: string) {
    return this.prisma.student.findUnique({ where: { personalCode } });
  }

  async findGradesByPersonalCode(personalCode: string) {
    return this.prisma.grade.findMany({
      where: { studentPersonalCode: personalCode },
      orderBy: { grade: 'asc' },
    });
  }
}
