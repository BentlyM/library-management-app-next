import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('book-id');

  if (!bookId) {
    return NextResponse.json(
      { success: false, message: 'Book ID is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch the book details from the database
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: {
          select: {
            name: true,
            picture: true,
            role: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify(
        book ? book : { success: false, message: 'Book not found' }
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching book:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred',
      }),
      { status: 500 }
    );
  }
}
