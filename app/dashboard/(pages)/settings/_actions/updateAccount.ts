'use server';

import prisma from '@/app/lib/prisma';
import { UpdateBookSchema } from '@/schema/book';
import { createClient } from '@/utils/supabase/server';

export async function UpdateAccount(formData: FormData) {
  const parsedData = UpdateBookSchema.safeParse({
    username: formData.get('username'),
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors.map((e) => e.message).join(', '),
    };
  }

  const supabase = createClient();

  // Get the authenticated user
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return { success: false, message: 'Error fetching user data' };
  }

  // Validate the current password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: userData.user.email as string,
    password: parsedData.data.currentPassword,
  });

  if (signInError) {
    return { success: false, message: 'Current password is incorrect' };
  }

  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userData.user.id },
  });

  if (!existingUser) {
    return { success: false, message: 'User not found' };
  }

  // Prepare update data for Prisma
  const updatedUserData: { name?: string } = {};
  if (parsedData.data.username) {
    updatedUserData.name = parsedData.data.username;
  }

  // Update user in Prisma
  await prisma.user.update({
    where: { id: userData.user.id },
    data: updatedUserData,
  });

  // Prepare updates for Supabase (only password)
  const updates: { password?: string } = {};
  if (parsedData.data.newPassword) {
    updates.password = parsedData.data.newPassword;
  }

  // Update password in Supabase
  const { error } = await supabase.auth.updateUser(updates, {
    emailRedirectTo: '/dashboard',
  });

  if (error) {
    return { success: false, message: 'Error updating account' };
  }

  return { success: true, message: 'Account updated successfully' };
}
