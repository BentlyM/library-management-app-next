'use server';

import prisma from '@/app/lib/prisma';

export async function DeleteBook(id: string) {
  if (!id) return { success: false, message: 'Book cannot be identified' };

  try {
    await prisma.readingProgress.deleteMany({
      where: { bookId: id },
    });

    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });

    if (!deletedBook) return { success: false, message: 'Book Not Found!' };

    return { success: true, data: deletedBook };
  } catch (error) {
    console.error('Error deleting book', error);
    return { success: false, message: 'unable to delete book.' };
  }
}
