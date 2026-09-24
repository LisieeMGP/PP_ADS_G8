import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a API está disponível' })
  @ApiResponse({ status: 200, description: 'Mensagem padrão da API' })
  getHello(): string {
    return this.appService.getHello();
  }
}
