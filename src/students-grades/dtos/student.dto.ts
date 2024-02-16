import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty()
  personalCode: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;
}
