import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExampleService } from './example.service';
import { Example } from './example.entity';
import { ExampleDto } from './example.dto';

describe('ExampleService', () => {
  let service: ExampleService;
  let repository: Repository<Example>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getRepositoryToken(Example),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
    repository = module.get<Repository<Example>>(getRepositoryToken(Example));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call find method', async () => {
    const findSpy = jest.spyOn(repository, 'find').mockResolvedValue([]);
    const result = await service.find();
    expect(findSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should call findOne method', async () => {
    const example = new Example();
    example.id = 1;
    example.name = 'Test';
    example.age = 30;

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(example);
    const result = await service.findOne({ where: { id: 1 } });
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(example);
  });

  it('should call create method', async () => {
    const exampleDto: ExampleDto = { name: 'Test', age: 30 };
    const example = new Example();
    example.id = 1;
    example.name = 'Test';
    example.age = 30;

    const createSpy = jest.spyOn(repository, 'create').mockReturnValue(example);
    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(example);
    const result = await service.create(exampleDto);
    expect(createSpy).toHaveBeenCalledWith(exampleDto);
    expect(saveSpy).toHaveBeenCalledWith(example);
    expect(result).toEqual(example);
  });

  it('should call update method', async () => {
    const exampleDto: ExampleDto = { name: 'Updated Test', age: 35 };
    const example = new Example();
    example.id = 1;
    example.name = 'Updated Test';
    example.age = 35;

    const updateSpy = jest
      .spyOn(repository, 'update')
      .mockResolvedValue(undefined);
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(example);
    const result = await service.update(1, exampleDto);
    expect(updateSpy).toHaveBeenCalledWith(1, exampleDto);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(example);
  });

  it('should call remove method', async () => {
    const deleteSpy = jest
      .spyOn(repository, 'delete')
      .mockResolvedValue(undefined);
    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
