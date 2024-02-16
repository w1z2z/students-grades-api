import { ApiProperty } from '@nestjs/swagger';

import { StudentDto } from './student.dto';

export class GradeLogsResponseDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  grade: number;

  @ApiProperty()
  student: StudentDto;
}
