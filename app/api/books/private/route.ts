'use server';

import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return new Response(JSON.stringify({ error: 'Error fetching user data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const userBooks = await prisma.user.findUnique({
    where: {
      email: data.user?.email,
    },
    select: {
      books: {
        distinct: ['id'],
        select: {
          id: true,
          title: true,
          author: true,
          summary: true,
          defaultRating: true,
          genre: true,
          cover: true,
          readingProgress: {
            select: {
              month: true,
              completionPercentage: true,
            },
          },
          isPublic: true,
          isVerificationRequested: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  revalidatePath('/dashboard');
  return new Response(JSON.stringify(userBooks ? userBooks : []), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
