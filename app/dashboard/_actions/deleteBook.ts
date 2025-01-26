'use server';

import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { Knock } from '@knocklabs/node';

const knock = new Knock(process.env.KNOCK_API_KEY);

export async function DeleteBook(id: string) {
  if (!id) return { success: false, message: 'Book cannot be identified' };

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

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

    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    if (deletedBook && data.user) {
      await knock.workflows.trigger('book-deleted', {
        recipients: [
          {
            id: data.user?.id,
            name: data.user?.email?.substring(0, data.user?.email.indexOf('@')),
            email: data.user?.email,
          },
        ],
      });
    }

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
