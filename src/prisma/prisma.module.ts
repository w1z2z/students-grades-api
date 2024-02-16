import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, { provide: PrismaClient, useClass: PrismaClient }],
  exports: [PrismaService],
})
export class PrismaModule {}
