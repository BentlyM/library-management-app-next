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
      genre: 'Non-Fiction',
      cover: 'https://placehold.co/300x400/png',
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
      genre: 'Adventure',
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
      genre: 'Romance',
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
      genre: 'Non-Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1733415539379_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book6 = await prisma.book.create({
    data: {
      title: 'The Death Cure',
      author: 'James Dashner',
      summary:
        'Thomas knows that WICKED can not be trusted, but they say the time for lies is over, but WICKED is good? ',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1736863252705_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book7 = await prisma.book.create({
    data: {
      title: 'how to be a women',
      author: 'caitlin moran',
      summary:
        'Caitlin Moran interweaves provocative observations on women’s lives with laugh-out-loud funny scenes from her own, from the riot of adolescence to her development as a writer, wife, and mother.',
      genre: 'Non-Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1735692570944_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book8 = await prisma.book.create({
    data: {
      title: 'floreskand king',
      author: 'moeton faulkner',
      summary:
        'The story of the Compson family, featuring some of the most memorable characters in literature: beautiful, rebellious Caddy; the manchild Benjy; haunted, neurotic Quentin; Jason, the brutal cynic; and Dilsey, their black servant. Their lives fragmented and harrowed by history and legacy, the character’s voices and actions mesh to create what is arguably Faulkner’s masterpiece and one of the greatest novels of the twentieth century.',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1729474543563_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book9 = await prisma.book.create({
    data: {
      title: 'Out of the box',
      author: 'suzanne dudley',
      summary:
        'A collection of short stories that will take you out of your comfort zone.',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1738959485959_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book10 = await prisma.book.create({
    data: {
      title: 'Abandoned Kingdom',
      author: 'glaudia wilson',
      summary: 'A young princess must save her kingdom from an evil sorcerer.',
      genre: 'Fantasy',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/173094993895_cover.jpg',
      rating: 5,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book11 = await prisma.book.create({
    data: {
      title: 'journey to the inner self',
      author: 'preeti singla',
      summary: 'inspirational poems to quiet the mind and sooth the soul',
      genre: 'Non-Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1739540594053_cover.jpg',
      rating: 5,
      user: { connect: { id: user2.id } },
      isPublic: true,
    },
  });

  const book12 = await prisma.book.create({
    data: {
      title: 'really, good, actually',
      author: 'monica heisey',
      summary: 'a voices the VOICES',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/1739849894391_cover.jpg',
      rating: 4,
      user: { connect: { id: user1.id } },
      isPublic: true,
    },
  });

  const book13 = await prisma.book.create({
    data: {
      title: 'something nasty in the woodsheed',
      author: 'kyri bonfigiai',
      summary:
        'splendidly enjoyable. the jokes are excellent, but the most horrible things keep happening',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/172948396599_cover.jpg',
      rating: 4,
      user: { connect: { id: user2.id } },
      isPublic: true,
    },
  });

  const book14 = await prisma.book.create({
    data: {
      title: 'i want my hat back',
      author: 'jon klassen',
      summary: 'something about a bear losing his hat or something',
      genre: 'Fiction',
      cover:
        'https://igtnbgdhxezmzgvxesbi.supabase.co/storage/v1/object/public/covers/172065094053_cover.jpg',
      rating: 4,
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
      completionPercentage: 60,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book4.id,
      month: 1,
      completionPercentage: 45,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book5.id,
      month: 1,
      completionPercentage: 32,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book6.id,
      month: 1,
      completionPercentage: 10,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book7.id,
      month: 1,
      completionPercentage: 77,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book8.id,
      month: 2,
      completionPercentage: 42,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book9.id,
      month: 5,
      completionPercentage: 47,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book10.id,
      month: 9,
      completionPercentage: 30,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book11.id,
      month: 3,
      completionPercentage: 63,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book12.id,
      month: 11,
      completionPercentage: 90,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book13.id,
      month: 10,
      completionPercentage: 58,
    },
  });

  await prisma.readingProgress.create({
    data: {
      bookId: book14.id,
      month: 7,
      completionPercentage: 43,
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
