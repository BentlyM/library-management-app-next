'use server';

import prisma from '@/app/lib/prisma';
import { UpdateBookSchema } from '@/schema/book';
import { createClient } from '@/utils/supabase/server';

export async function UpdateAccount(formData: FormData) {
  const parsedData = UpdateBookSchema.safeParse({
    email: formData.get('email'),
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

  console.log(userData.user.email);

  if (signInError) {
    return { success: false, message: 'Current password is incorrect' };
  }

  // Check if the new email already exists in Prisma
  const existingUser = await prisma.user.findUnique({
    where: { email: parsedData.data.email },
  });

  if (existingUser && existingUser.id !== userData.user.id) {
    return { success: false, message: 'Email already in use' };
  }

  // Update user in Prisma
  const updatedUserData = {
    name: parsedData.data.username || undefined,
    email: parsedData.data.email || undefined,
  };

  // Update user only if there's any change
  await prisma.user.update({
    where: { id: userData.user.id }, // Use user ID from Supabase
    data: Object.fromEntries(
      Object.entries(updatedUserData).filter(([_, v]) => v !== undefined)
    ),
  });

  // Prepare updates for Supabase
  const updates: { email?: string; password?: string } = {};
  if (parsedData.data.newPassword) {
    updates.password = parsedData.data.newPassword;
  }
  if (parsedData.data.email !== userData.user.email) {
    updates.email = parsedData.data.email;
  }

  // Update email and password in Supabase
  const { error } = await supabase.auth.updateUser(updates,
    {emailRedirectTo: '/dashboard'}
  );

  if (error) {
    return { success: false, message: 'Error updating account' };
  }

  return { success: true, message: 'Account updated successfully' };
} // extremely buggy need to fix
