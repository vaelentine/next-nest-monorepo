import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleDto } from './example.dto';
import { Example } from './example.entity';

describe('ExampleController (e2e)', () => {
  let app: INestApplication;
  let service: ExampleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        {
          provide: ExampleService,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<ExampleService>(ExampleService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('/GET examples', async () => {
    const examples: Example[] = [];
    jest.spyOn(service, 'find').mockResolvedValue(examples);

    const response = await request(app.getHttpServer()).get('/examples');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(examples);
  });

  it('/GET examples/:id', async () => {
    const example = new Example();
    example.id = 1;
    example.name = 'Test';
    example.age = 30;

    jest.spyOn(service, 'findOne').mockResolvedValue(example);

    const response = await request(app.getHttpServer()).get('/examples/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(example);
  });

  it('/POST examples', async () => {
    const exampleDto: ExampleDto = { name: 'Test', age: 30 };
    const example = new Example();
    example.id = 1;
    example.name = 'Test';
    example.age = 30;

    jest.spyOn(service, 'create').mockResolvedValue(example);

    const response = await request(app.getHttpServer())
      .post('/examples')
      .send(exampleDto);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(example);
  });

  it('/PUT examples/:id', async () => {
    const exampleDto: ExampleDto = { name: 'Updated Test', age: 35 };
    const example = new Example();
    example.id = 1;
    example.name = 'Updated Test';
    example.age = 35;

    jest.spyOn(service, 'update').mockResolvedValue(example);

    const response = await request(app.getHttpServer())
      .put('/examples/1')
      .send(exampleDto);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(example);
  });

  it('/DELETE examples/:id', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    const response = await request(app.getHttpServer()).delete('/examples/1');
    expect(response.status).toBe(200);
  });

  it('should return validation error for invalid POST request', async () => {
    const invalidExampleDto = {}; // Missing required fields

    const response = await request(app.getHttpServer())
      .post('/examples')
      .send(invalidExampleDto);
    expect(response.status).toBe(400);

    const errorMessages = response.body.message.map(
      (error: any) => error.path[0],
    );
    expect(errorMessages).toContain('name');
    expect(errorMessages).toContain('age');
  });
});
