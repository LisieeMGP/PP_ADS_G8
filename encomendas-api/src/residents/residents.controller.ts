import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResidentsService } from './residents.service.js';

interface CreateResidentBody {
  name?: string;
  block?: string;
  unit?: string;
}

@Controller('residents')
@ApiTags('residents')
@ApiBearerAuth('access-token')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Get()
  findAll() {
    return this.residentsService.findAll();
  }

  @Post()
  create(@Body() body: CreateResidentBody) {
    return this.residentsService.create(body.name ?? '', body.block, body.unit ?? '');
  }
}