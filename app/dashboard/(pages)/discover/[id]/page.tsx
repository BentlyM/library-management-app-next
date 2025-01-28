'use client';
import Image from 'next/image';
import React from 'react';
import { Box, Chip, Rating, Stack, Typography } from '@mui/material';
import { useDrawer } from '@/app/components/providers/DrawerProvider';
import { useQuery } from '@tanstack/react-query';
import { Book } from '@prisma/client';

const Page = () => {
  const { open, drawerWidth } = useDrawer();
  const book = {
    title: 'The Great Novel',
    author: 'Jane Author',
    rating: 4.5,
    genre: 'Fiction, Classic, Drama',
    pages: 328,
    language: 'English',
    description: 'A captivating story about...',
    provider: 'SomeUser',
    purchaseLinks: {
      amazon: '#',
      barnesNoble: '#',
    },
  };

  const fetchBookQuery = useQuery<Book>({
    queryKey: ['unique-book'],
    queryFn: () => fetch(`/api/books/unique?book-id`).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
        }}
      >
        <Image
          src={
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetcovers.com%2Fwp-content%2Fuploads%2F2020%2F12%2Fimage20-820x1024.jpg&f=1&nofb=1&ipt=df1579712cd48e2687d415cddcfb371d5fa46c5635fea3a2ae4878f6d3d24812&ipo=images'
          }
          fill={true}
          style={{
            opacity: 0.5,
            objectFit: 'cover',
          }}
          alt={''}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: {
            xs: '50px',
            md: open ? `${drawerWidth + 50}px` : '50px',
          },
          top: '150px',
          transition: 'left 0.2s',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Image
          height={260}
          width={200}
          alt=""
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetcovers.com%2Fwp-content%2Fuploads%2F2020%2F12%2Fimage20-820x1024.jpg&f=1&nofb=1&ipt=df1579712cd48e2687d415cddcfb371d5fa46c5635fea3a2ae4878f6d3d24812&ipo=images"
          style={{
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            zIndex: 2,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <div>
            <Typography variant="h3" component="h1" sx={{ mt: 2 }}>
              {book.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
              by {book.author}
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: '',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div>
              <Typography>Provider: {book.provider}</Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Rating value={book.rating} precision={0.5} readOnly />
                <Typography variant="body1">({book.rating}/5)</Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {book.genre.split(',').map((genre, index) => (
                  <Chip
                    key={index}
                    label={genre.trim()}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
