import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Prueba')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Endpoint de prueba' })
  @ApiResponse({ 
    status: 200, 
    description: 'Respuesta exitosa', 
    example: {
      "success": true,
      "data": "Hello World!",
      "timestamp": "[Generated]"
    }
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}