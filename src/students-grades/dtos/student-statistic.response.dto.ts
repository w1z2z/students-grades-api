import { ApiProperty } from '@nestjs/swagger';

import { StudentDto } from './student.dto';

export class StatisticItem {
  @ApiProperty()
  subject: string;

  @ApiProperty()
  maxGrade: number;

  @ApiProperty()
  minGrade: number;

  @ApiProperty()
  avgGrade: number;

  @ApiProperty()
  totalGrades: number;
}

export class StudentStatisticResponseDto {
  @ApiProperty()
  student: StudentDto;

  @ApiProperty({ type: [StatisticItem] })
  statistic: StatisticItem[];
}
