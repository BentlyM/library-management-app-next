'use server';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateBook(formData: FormData) {
  const bookId = String(formData.get('id'));
  const newTitle = String(formData.get('title'));
  const newAuthor = String(formData.get('author'));
  const newSummary = String(formData.get('summary'));

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
    throw new Error('Unable to update book.');
  }

  return updatedBook;
}
