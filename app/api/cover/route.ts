'use server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') as string;
  const author = searchParams.get('author') as string;

  const res = await fetch(
    `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(
      title
    )}&author_name=${encodeURIComponent(author)}`
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: 'Error fetching cover, please try again' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const cover = await res.json();

  return new Response(JSON.stringify({ url: cover.url }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}