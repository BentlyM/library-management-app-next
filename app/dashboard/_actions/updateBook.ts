'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { Knock } from '@knocklabs/node';
import { revalidatePath } from 'next/cache';

const knock = new Knock(process.env.KNOCK_API_KEY);

export async function updateBook(formData: FormData) {
  if (!formData) return { success: false, message: 'Unable to Config Data...' };

  const bookId = String(formData.get('id'));
  const newTitle = String(formData.get('title'));
  const newAuthor = String(formData.get('author'));
  const newSummary = String(formData.get('summary'));
  const newRating = Number(formData.get('rating'));
  const newProgress = Number(formData.get('progress'));

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!bookId) return { success: false, message: 'Book can not be identified' };

  const updatedData = {
    ...(newTitle ? { title: newTitle } : {}),
    ...(newAuthor ? { author: newAuthor } : {}),
    ...(newSummary ? { summary: newSummary } : {}),
    ...(newRating ? { defaultRating: newRating } : {}),
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

  if (updatedBook && data.user) {
    await knock.workflows.trigger('book-updated', {
      recipients: [
        {
          id: data.user?.id,
          name: data.user?.email?.substring(0, data.user?.email.indexOf('@')),
          email: data.user?.email,
        },
      ],
    });
  }

  revalidatePath('/dashboard/discover');
  return { success: true, data: updatedBook };
}

export async function updatePermissions(formData: FormData) {
  const bookId = formData.get('bookId') as string;
  const isPublic = formData.get('isPublic') === 'true';
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!bookId || !data.user?.id) {
    if (!data.user?.id) {
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

    if (existingPermission && data.user) {
      await knock.workflows.trigger('book-updated', {
        recipients: [
          {
            id: data.user?.id,
            name: data.user?.email?.substring(0, data.user?.email.indexOf('@')),
            email: data.user?.email,
          },
        ],
      });
    }

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
    if (existingPermission && data.user) {
      await knock.workflows.trigger('book-updated', {
        recipients: [
          {
            id: data.user?.id,
            name: data.user?.email?.substring(0, data.user?.email.indexOf('@')),
            email: data.user?.email,
          },
        ],
      });
    }

    revalidatePath('/dashboard/discover');
    return {
      success: true,
      message: 'Permissions created successfully',
    };
  }
}

export async function requestVerification({ bookId }: { bookId: string }) {
  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { isVerificationRequested: true },
  });

  const status = {
    isVerificationRequested: updatedBook.isVerificationRequested,
    isVerified: updatedBook.isVerified,
    verificationStatus: updatedBook.isVerificationRequested
      ? 'Pending'
      : 'Not Requested',
  };

  return {
    success: true,
    status: status,
    message: 'Request sent successfully',
  };
}
