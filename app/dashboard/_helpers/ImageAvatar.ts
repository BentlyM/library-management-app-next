'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function ImageAvatar() {
  const supabase = createClient();

  const existingProfilePicture = await prisma.user.findUnique({
    where: {
      email: (await supabase.auth.getUser()).data.user?.email as string,
    },
    select: {
      picture: true,
    },
  });

  return existingProfilePicture?.picture;
}

export default ImageAvatar;
