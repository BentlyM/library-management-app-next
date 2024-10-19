'use server';

import prisma from '@/app/lib/prisma';

export async function DeleteBook(id: string) {
  if (!id) return { success: false, message: 'Book cannot be identified' };

  const deletedBook = await prisma.book.delete({
    where: {
      id,
    },
  });

  if (!deletedBook) return { success: false, message: 'Book Not Found!' };

  return { success: true, data: deletedBook };
}
