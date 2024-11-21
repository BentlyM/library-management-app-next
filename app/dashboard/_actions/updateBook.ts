'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';

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

  const currentMonth = new Date().getMonth() + 1;

  const updatedProgressData = {
    completionPercentage: newProgress,
  };

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

export async function updatePermissions(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const isPublic = formData.get('isPublic') === 'true';
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!bookId || !userId) {
    if (!userId) {
      return { success: false, message: 'userID is required' };
    } else {
      return { success: false, message: 'bookID is required' };
    }
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: { cover: true },
  });

  if (!book) {
    return { success: false, message: 'Book not found' };
  }

  if (isPublic && book.cover) {
    const existingPublicCover = await prisma.bookPermission.findFirst({
      where: {
        isPublic: true,
        book: {
          cover: book.cover,
        },
      },
    });

    if (existingPublicCover) {
      return {
        success: false,
        message:
          'Cannot make book public: Cover image is already in use by another public book',
      };
    }
  }

  const existingPermission = await prisma.bookPermission.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });

  if (existingPermission) {
    await prisma.bookPermission.update({
      where: {
        id: existingPermission.id,
      },
      data: {
        isPublic,
      },
    });
    return {
      success: true,
      message: 'Permissions updated successfully',
    };
  } else {
    await prisma.bookPermission.create({
      data: {
        userId,
        bookId,
        isPublic,
      },
    });
    return {
      success: true,
      message: 'Permissions created successfully',
    };
  }
}
