import { z } from 'zod';

export const CreateBookSchema = z.object({
  title: z.string().min(3, 'Title is required (minimum 3 characters)').max(100),
  author: z.string().min(1, 'Author is required').max(100), 
  summary: z
    .string()
    .min(3, 'Summary is required (minimum 3 characters)')
    .max(500)
    .optional(),
  genre: z.enum([
    'Fiction',
    'Non-Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Horror',
  ]),
  cover: z.string().optional(), 
});

export type CreateBookSchemaType = z.infer<typeof CreateBookSchema>;
