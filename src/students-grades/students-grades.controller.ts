import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StudentsGradesService } from './students-grades.service';
import { GradeLogsResponseDto } from './dtos/grade-logs.response.dto';
import { StudentStatisticResponseDto } from './dtos/student-statistic.response.dto';

@ApiTags('HTTP-endpoints')
@Controller('')
export class StudentsGradesController {
  constructor(private readonly studentsGradesService: StudentsGradesService) {}

  @Get('log')
  @ApiOperation({
    summary: 'Получить журнал оценок',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Номер страницы (по умолчанию 1)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Количество записей на странице (по умолчанию 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос',
    type: [GradeLogsResponseDto],
  })
  async getGradesLog(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ): Promise<GradeLogsResponseDto[]> {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    return await this.studentsGradesService.getGradesLog(
      pageNumber,
      limitNumber,
    );
  }

  @Get('statistic/:personalCode')
  @ApiOperation({
    summary: 'Получить статистику по студенту',
  })
  @ApiParam({
    name: 'personalCode',
    type: String,
    description: 'Персональный код студента',
  })
  @ApiResponse({
    status: 200,
    description: 'Успешный запрос',
    type: StudentStatisticResponseDto,
  })
  async getStudentStatistic(
    @Param('personalCode') personalCode: string,
  ): Promise<StudentStatisticResponseDto> {
    return this.studentsGradesService.getStudentStatistic(personalCode);
  }
}
