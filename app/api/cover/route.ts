'use server';

async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const title = searchParams.get('title') as string;
    const author = searchParams.get('author') as string; // jesus bro? 

  const res = await fetch(
    `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(
      title
    )}&author_name=${encodeURIComponent(author)}$`
  );

  if(!res.ok) return Response.json({error: 'Error fetching cover, Please try again'});

  const cover = await res.json();

  return Response.json(cover.url);
}
