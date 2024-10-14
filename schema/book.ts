import { z } from 'zod';

export const CreateBookSchema = z.object({
  title: z.string().min(3).max(10),
  author: z.string().min(1).max(10),
  summary: z.string().min(3).max(50),
  genre: z.enum([
    'Fiction',
    'Non-Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Horror',
  ]),
});

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
