'use server';
import prisma from '@/app/lib/prisma';

export async function updateBook(formData: FormData) {
  if (!formData) return { success: false, message: 'Unable to Config Data...' };

  const bookId = String(formData.get('id'));
  const newTitle = String(formData.get('title'));
  const newAuthor = String(formData.get('author'));
  const newSummary = String(formData.get('summary'));

  if (!bookId) return { success: false, message: 'Book can not be identified' };

  const updatedData = {
    ...(newTitle ? { title: newTitle } : {}),
    ...(newAuthor ? { author: newAuthor } : {}),
    ...(newSummary ? { summary: newSummary } : {}),
  };

  const updatedBook = await prisma.book.update({
    where: {
      id: String(bookId),
    },
    data: updatedData,
  });

  if (!updatedBook) {
    return { success: false, message: 'Unable to update book.' };
  }

  return { success: true, data: updatedBook };
}
