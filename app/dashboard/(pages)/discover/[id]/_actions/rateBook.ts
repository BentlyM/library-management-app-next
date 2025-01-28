import prisma from "@/app/lib/prisma";

export async function rateBook({userId, bookId, ratingValue}: {userId: string, bookId: string, ratingValue: number}) {
  // Check if the user has already rated the book
  const existingRating = await prisma.rating.findUnique({
    where: { bookId_userId: { userId, bookId } },
  });

  if (existingRating) {
    // Update existing rating
    await prisma.rating.update({
      where: { id: existingRating.id },
      data: { value: ratingValue },
    });
  } else {
    // Create new rating
    await prisma.rating.create({
      data: {
        userId,
        bookId,
        value: ratingValue,
      },
    });
  }

  // Recalculate average rating
  const ratings = await prisma.rating.findMany({
    where: { bookId },
  });

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;

  // Update the book's average rating
  await prisma.book.update({
    where: { id: bookId },
    data: { averageRating },
  });
}
