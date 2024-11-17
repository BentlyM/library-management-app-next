'use server';

import prisma from '@/app/lib/prisma';

export async function DeleteBook(id: string) {
  if (!id) return { success: false, message: 'Book cannot be identified' };

  try {
    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return { success: false, message: 'Book not found' };
    }

    await prisma.readingProgress.deleteMany({
      where: { bookId: id },
    });

    await prisma.bookPermission.deleteMany({
      where: {bookId: id}
    })

    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    return { success: true, data: deletedBook };
  } catch (error) {
    console.error('Error deleting book:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? `Unable to delete book: ${error.message}`
          : 'Unable to delete book',
    };
  }
}
