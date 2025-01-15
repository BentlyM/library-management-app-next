'use server';

import prisma from '@/app/lib/prisma';
import { CreateBookSchema } from '@/schema/book';
import { createClient } from '@/utils/supabase/server';

export async function CreateBook(formData: FormData) {
  const parsedData = Object.fromEntries(formData);
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  let coverUrl: string | undefined;

  const cover = formData.get('cover');

  if (cover) {
    if (cover instanceof Blob) {
      coverUrl = await uploadCover(cover);
      parsedData.cover = coverUrl;
    } else if (typeof cover === 'string') {
      coverUrl = cover; // its already a url
    }
  }

  const validatedData = CreateBookSchema.safeParse(parsedData);

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.errors.map((e) => e.message).join(', '),
    };
  }

  const book = await prisma.book.create({
    data: {
      title: validatedData.data?.title,
      author: validatedData.data?.author,
      summary: validatedData.data?.summary || '',
      genre: validatedData.data?.genre,
      cover: coverUrl || 'https://placehold.co/300x400/png', 
      user: {
        connect: {
          email: data.user?.email,
        },
      },
    },
  });

  return {success: true, data: book};
}

async function uploadCover(cover: File): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from('covers')
    .upload(`${Date.now()}_${cover.name}`, cover, {
      contentType: cover.type || 'image/png',
    });

  if (error) {
    throw new Error(`Uploading error: ${error.message}`);
  }

  const { data: publicUrl } = supabase.storage
    .from('covers')
    .getPublicUrl(data.path);

  return Promise.resolve(publicUrl.publicUrl);
}
