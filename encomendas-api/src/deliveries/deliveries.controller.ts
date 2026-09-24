import { Body, Controller, Get, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeliveriesService } from './deliveries.service.js';

interface CreateDeliveryBody {
  residentId?: number;
  description?: string;
  trackingCode?: string;
}

@Controller('deliveries')
@ApiTags('deliveries')
@ApiBearerAuth('access-token')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  findAll(@Query('search') search?: string, @Query('pendingOnly') pendingOnly?: string) {
    return this.deliveriesService.findAll(search, pendingOnly === 'true');
  }

  @Post()
  create(@Body() body: CreateDeliveryBody, @Request() request: { user: { sub: number } }) {
    return this.deliveriesService.create(Number(body.residentId), body.description ?? '', body.trackingCode, request.user.sub);
  }

  @Patch(':id/pickup')
  pickup(@Request() request: { params: { id: string }; user: { sub: number } }) {
    return this.deliveriesService.pickup(Number(request.params.id), request.user.sub);
  }
}