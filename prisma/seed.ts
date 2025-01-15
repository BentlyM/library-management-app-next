import { PrismaClient, Plan, SubscriptionPeriod } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      picture: 'https://example.com/alice.jpg',
      plan: Plan.FREE,
      customerId: 'alice-customer-id',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      picture: 'https://example.com/bob.jpg',
      plan: Plan.SUBSCRIPTION,
      customerId: 'bob-customer-id',
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      title: 'Another side of the moon',
      author: 'John Doe',
      summary: 'A thrilling adventure about a man’s journey across the moon.',
      genre: 'Adventure',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1729474516084_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Learning Prisma',
      author: 'Jane Doe',
      summary:
        'An insightful guide to mastering Prisma for backend development.',
      genre: 'Programming',
      cover: 'https://placehold.co/300x400',
      rating: 4,
      user: { connect: { id: user2.id } },
      isPublic: true,
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: 'The hobbit',
      author: 'j.r.r. tolkien',
      summary: 'a hobbit goes on an adventure',
      genre: 'adventure',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1729685675170_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book4 = await prisma.book.create({
    data: {
      title: 'SOUL',
      author: 'Olivia wilson',
      summary: 'an emotional rollercoaster of a story',
      genre: 'romance',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1729714142699_cover.jpg',
      rating: 4,
      user: { connect: { id: user2.id } },
      isPublic: true,
    },
  });

  const book5 = await prisma.book.create({
    data: {
      title: 'jaws',
      author: 'peter benchley',
      summary:
        'A giant great white shark arrives on the shores of a New England beach resort and wreak',
      genre: 'Art',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1733415539379_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  // Create reading progress
  await prisma.readingProgress.create({
    data: {
      bookId: book1.id,
      month: 1,
      completionPercentage: 45,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book2.id,
      month: 1,
      completionPercentage: 70,
    },
  });

    await prisma.readingProgress.create({
        data: {
        bookId: book3.id,
        month: 1,
        completionPercentage: 100,
        },
    });

    await prisma.readingProgress.create({
        data: {
        bookId: book4.id,
        month: 1,
        completionPercentage: 100,
        },
    });

    await prisma.readingProgress.create({
        data: {
        bookId: book5.id,
        month: 1,
        completionPercentage: 100,
        },
    });

  // Create subscriptions
  await prisma.subscription.create({
    data: {
      userId: user2.id,
      plan: Plan.SUBSCRIPTION,
      period: SubscriptionPeriod.MONTHLY,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
