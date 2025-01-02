import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], 
});

export type registrationSchemaType = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type loginSchemaType = z.infer<typeof loginSchema>;