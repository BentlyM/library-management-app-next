'use server';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/app/lib/prisma';
import { registrationSchema } from '@/schema/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function register(formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/dashboard');
  }

  const parsedData = registrationSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { username, email, password } = parsedData.data;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  try {
    await prisma.user.create({
      data: {
        id: (await supabase.auth.getUser()).data.user?.id,
        name: username,
        email,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
