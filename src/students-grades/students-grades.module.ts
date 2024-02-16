import { Module } from '@nestjs/common';

import { StudentsGradesService } from './students-grades.service';
import { StudentsGradesController } from './students-grades.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StudentsGradesService],
  exports: [StudentsGradesService],
  controllers: [StudentsGradesController],
})
export class StudentsGradesModule {}
