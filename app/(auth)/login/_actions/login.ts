'use server';

import { revalidatePath } from 'next/cache';
import { loginSchema } from '@/schema/auth';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/dashboard');
  }

  const parsedData = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsedData.success) {
    throw new Error(parsedData.error.errors.map((e) => e.message).join(', '));
  }

  const { email, password } = parsedData.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
