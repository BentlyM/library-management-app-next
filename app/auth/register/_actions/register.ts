'use server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/app/lib/prisma';
import { registrationSchema } from '@/schema/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function register(formData: FormData) {
  const supabase = createClient();

  const parsedData = registrationSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsedData.success) {
    throw new Error(parsedData.error.errors.map((e) => e.message).join(', '));
  }

  const { username, email, password } = parsedData.data;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  try {
    await prisma.user.create({
      data: {
        name: username,
        email,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);  // wait wouldnt this be recursive?
    }
  }

  revalidatePath('/register', 'layout');
  redirect('/auth/login');
}
