import { Module } from '@nestjs/common';

import { NatsService } from './nats.service';
import { StudentsGradesModule } from '../students-grades/students-grades.module';

@Module({
  imports: [StudentsGradesModule],
  providers: [NatsService],
})
export class NatsModule {}
