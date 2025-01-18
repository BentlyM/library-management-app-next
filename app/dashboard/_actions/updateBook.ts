'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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

  revalidatePath('/dashboard/discover');
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
    select: { cover: true, author: true, title: true },
  });

  if (!book) {
    return { success: false, message: 'Book not found' };
  }

  if (isPublic) {
    if (book.cover && book.cover.split('/').includes('placehold.co')) {
      return {
        success: false,
        message:
          'Cannot upload book publicly: Cover image cannot be placeholder',
      };
    }

    const normalizedTitle = book.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedAuthor = book.author
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');

    const existingPublicBook = await prisma.book.findFirst({
      where: {
        isPublic: true,
        title: { contains: normalizedTitle, mode: 'insensitive' },
        author: { contains: normalizedAuthor, mode: 'insensitive' },
      },
    });

    if (existingPublicBook) {
      return {
        success: false,
        message:
          'Cannot upload book publicly: A book with the same title and author already exists.',
      };
    }

    const existingPublicCover = await prisma.book.findFirst({
      where: {
        isPublic: true,
        cover: book.cover,
      },
    });

    if (existingPublicCover) {
      return {
        success: false,
        message:
          'Cannot upload book publicly: Cover image is already in use by another public book',
      };
    }
  }

  const existingPermission = await prisma.book.findUnique({
    where: {
      id: bookId,
      isPublic: true,
    },
  });

  if (existingPermission) {
    await prisma.book.update({
      where: {
        id: existingPermission.id,
      },
      data: {
        isPublic,
      },
    });
    revalidatePath('/dashboard/discover');
    return {
      success: true,
      message: 'Permissions updated successfully',
    };
  } else {
    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        isPublic,
      },
    });
    revalidatePath('/dashboard/discover');
    return {
      success: true,
      message: 'Permissions created successfully',
    };
  }
}
