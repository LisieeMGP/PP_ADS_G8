import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { ResidentsController } from './residents.controller.js';
import { ResidentsService } from './residents.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ResidentsController],
  providers: [ResidentsService],
  exports: [ResidentsService],
})
export class ResidentsModule {}