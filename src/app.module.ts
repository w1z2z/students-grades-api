import { Module } from '@nestjs/common';

import { NatsModule } from './nats/nats.module';
import { StudentsGradesModule } from './students-grades/students-grades.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NatsModule, StudentsGradesModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
