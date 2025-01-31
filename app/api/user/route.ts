import { createClient } from '@/utils/supabase/server';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export const GET = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if(error){
    Response.json({message: error.message}); 
  }

  let user = await prisma.user.findUnique({
    where: {
      email: data.user?.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: data.user?.id,
        email: data.user?.email as string,
        name: data.user?.email?.substring(0, data.user?.email.indexOf('@')),
      },
    });
  }

  revalidatePath('/dashboard');
  return Response.json(user);
};
