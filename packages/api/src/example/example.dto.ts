import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ExampleSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export class ExampleDto extends createZodDto(ExampleSchema) {}
