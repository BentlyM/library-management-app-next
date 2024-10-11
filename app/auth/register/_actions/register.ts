'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function register(formData: FormData) {
  const supabase = createClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password !== confirmPassword) {
    redirect('/register?error="passwords do not match"');
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Redirect with a specific error message
    redirect(`/register?error="${encodeURIComponent(error.message)}"`);
  }

  revalidatePath('/register', 'layout');
  redirect('/auth/login');
}


