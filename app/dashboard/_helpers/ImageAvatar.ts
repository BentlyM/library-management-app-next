'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function ImageAvatar({
  profilePicture,
}: {
  profilePicture: string | null;
}) {
  const supabase = createClient();

  // Fetch the existing profile picture from the database
  const existingProfilePicture = await prisma.user.findUnique({
    where: {
      email: (await supabase.auth.getUser()).data.user?.email as string,
    },
    select: {
      picture: true,
    },
  });

  // Return the existing profile picture if available, otherwise fallback to profilePicture
  return existingProfilePicture?.picture ?? profilePicture;
}

export default ImageAvatar;
