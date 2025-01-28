import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const publicBooks = await prisma.book.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      title: true,
      author: true,
      summary: true,
      genre: true,
      cover: true,
      rating: true,
      isRecommended: true,
      isVerified: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  revalidatePath('/dashboard/discover');

  return new Response(
    JSON.stringify(
      publicBooks
        ? { books: publicBooks }
        : [
            {
              title: 'placeholder',
              cover:
                'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblog.springshare.com%2Fwp-content%2Fuploads%2F2010%2F02%2Fnc-md.gif&f=1&nofb=1&ipt=a4e77294da0c01eb2e8f94952bda95258fa3c2b3bb0a1dfb5f012e77b32271f0&ipo=images',
            },
          ]
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
}
