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

export const UpdateBookSchema = z.object({
  username: z.string().min(3, 'Username is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  currentPassword: z
    .string()
    .min(6, 'Your current password is under 6 characters'),
  newPassword: z.string().min(6, 'New Password must be at least 6 characters').optional(),
});

export type UpdateBookSchema = z.infer<typeof UpdateBookSchema>;
