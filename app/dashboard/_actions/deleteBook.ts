'use server';

import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function DeleteBook(id: string) {
  const deletedBook = await prisma.book.delete({
    where: {
      id,
    },
  });

  if (!deletedBook) {
    throw new Error('Book Not Found!');
  }
  
  return deletedBook;
}
