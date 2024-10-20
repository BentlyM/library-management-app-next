'use server';
import prisma from '@/app/lib/prisma';

export async function updateBook(formData: FormData) {
  if (!formData) return { success: false, message: 'Unable to Config Data...' };

  const bookId = String(formData.get('id'));
  const newTitle = String(formData.get('title'));
  const newAuthor = String(formData.get('author'));
  const newSummary = String(formData.get('summary'));
  const newRating = Number(formData.get('rating'));
  const newProgress = Number(formData.get('progress'));

  if (!bookId) return { success: false, message: 'Book can not be identified' };

  const updatedData = {
    ...(newTitle ? { title: newTitle } : {}),
    ...(newAuthor ? { author: newAuthor } : {}),
    ...(newSummary ? { summary: newSummary } : {}),
    ...(newRating ? { rating: newRating } : {}),
  };

  const currentMonth = new Date().getMonth() + 1; // 1-indexed up (1-12)

  const updatedProgressData = {
    completionPercentage: newProgress,
  };

  // Check if progress entry exists for the current month
  const existingProgress = await prisma.readingProgress.findUnique({
    where: {
      bookId_month: {
        bookId: bookId,
        month: currentMonth,
      },
    },
  });

  if (existingProgress) {
    await prisma.readingProgress.update({
      where: {
        bookId_month: {
          bookId: bookId,
          month: currentMonth,
        },
      },
      data: updatedProgressData,
    });
  } else {
    await prisma.readingProgress.create({
      data: {
        bookId: bookId,
        month: currentMonth,
        completionPercentage: newProgress,
      },
    });
  }

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
