import { Controller, Get } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

@Controller('healthz')
export class HealthzController {
  @Get()
  healthz() {
    return StatusCodes.OK;
  }
}
