import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { Example } from './example.entity';
import { FindOneOptions } from 'typeorm';
import { ZodValidationPipe } from '../middleware/zod-validation-pipe';
import { ExampleSchema, ExampleDto } from './example.dto';

@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  async findAll(): Promise<Example[]> {
    return this.exampleService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Example> {
    const options: FindOneOptions<Example> = { where: { id } };
    return this.exampleService.findOne(options);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(ExampleSchema))
  async create(@Body() exampleDto: ExampleDto): Promise<Example> {
    return this.exampleService.create(exampleDto);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(ExampleSchema))
  async update(
    @Param('id') id: number,
    @Body() exampleDto: ExampleDto,
  ): Promise<Example> {
    return this.exampleService.update(id, exampleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.exampleService.remove(id);
  }
}
