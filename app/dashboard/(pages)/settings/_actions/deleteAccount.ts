'use server';

import { PrismaClient } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';

const prisma = new PrismaClient();

export async function DeleteAccount() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { success: false, message: 'Unable to find User' };
  }

  try {
    const userWithBooks = await prisma.user.findUnique({
      where: { email: data.user?.email },
      include: { books: { include: { readingProgress: true } } },
    });

    if (!userWithBooks) {
      return { success: false, message: 'User not found' };
    }

   
    await prisma.readingProgress.deleteMany({
      where: {
        bookId: {
          in: userWithBooks.books.map((book) => book.id),
        },
      },
    });

    
    await prisma.book.deleteMany({
      where: {
        user: {
          some: {
            email: data.user?.email,
          },
        },
      },
    });

    await prisma.user.delete({
      where: { email: data.user?.email },
    });

    const { error } = await supabase.auth.admin.deleteUser(data.user?.id, true);

    if (error) {
      return {
        success: false,
        message: 'Error deleting account from Supabase',
      };
    }

    return {
      success: true,
      message: 'Successfully deleted account and related data',
    };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, message: 'Error deleting account' };
  } finally {
    await prisma.$disconnect();
  }
}
