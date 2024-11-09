import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Example } from './example.entity';
import { ExampleDto } from './example.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private readonly exampleRepository: Repository<Example>,
  ) {}

  async find(): Promise<Example[]> {
    return this.exampleRepository.find();
  }

  async findOne(options: FindOneOptions<Example>): Promise<Example> {
    return this.exampleRepository.findOne(options);
  }

  async create(exampleDto: ExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(exampleDto);
    return this.exampleRepository.save(example);
  }

  async update(id: number, exampleDto: ExampleDto): Promise<Example> {
    await this.exampleRepository.update(id, exampleDto);
    return this.exampleRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.exampleRepository.delete(id);
  }
}
