'use server';

import prisma from '@/app/lib/prisma';

export async function DeleteBook(id: string) {
  if (!id) throw new Error('Book can not be identified');

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
