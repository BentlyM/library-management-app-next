'use server';
import prisma from '@/app/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export async function AddAvatar(formData: FormData) {
  const parsedData = Object.fromEntries(formData);
  const supabase = createClient();

  let avatarUrl: string | undefined;

  const avatar = formData.get('profilePicture');

  if (avatar) {
    if (avatar instanceof Blob) {
      avatarUrl = await uploadAvatar(avatar);
      parsedData.cover = avatarUrl;
    }
  } else {
    return { success: false, message: 'No avatar found' };
  }

  await prisma.user.update({
    where: {
      email: (await supabase.auth.getUser()).data.user?.email as string,
    },
    data: {
      picture: String(avatarUrl),
    },
  });

  return { success: true, avatarUrl };
}

async function uploadAvatar(avatar: File): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from('profiles')
    .upload(`${Date.now()}_${avatar.name}`, avatar, {
      contentType: avatar.type || 'image/png',
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrl } = supabase.storage
    .from('profiles')
    .getPublicUrl(data.path);

  return Promise.resolve(publicUrl.publicUrl);
}
