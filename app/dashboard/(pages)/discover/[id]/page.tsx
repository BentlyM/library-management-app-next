'use client';
import Image from 'next/image';
import React from 'react';
import { Box, Chip, Rating, Stack, Typography } from '@mui/material';
import { useDrawer } from '@/app/components/providers/DrawerProvider';
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  averageRating: number | null;
  provider: string;
  user: [
    {
      name: string;
      picture: string;
      role: string;
    }
  ];
}

const Page = ({ params }: { params: { id: string } }) => {
  const { open, drawerWidth } = useDrawer();

  const fetchBookQuery = useQuery<Book>({
    queryKey: ['unique-book', params.id],
    queryFn: () =>
      fetch(`/api/books/unique?book-id=${params.id}`).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  const isLoading = fetchBookQuery.isLoading || fetchBookQuery.isFetching;
  const book = fetchBookQuery.data;

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
        }}
      >
        <SkeletonWrapper isLoading={isLoading} width="100%" height="200px">
          <Image
            src={book?.cover || ''}
            fill={true}
            style={{
              opacity: 0.5,
              objectFit: 'cover',
            }}
            alt={book?.title || ''}
          />
        </SkeletonWrapper>
      </Box>

      {/* Book details */}
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
        {/* Book cover */}
        <SkeletonWrapper isLoading={isLoading} width={200} height={260}>
          <Image
            height={260}
            width={200}
            alt={book?.title || ''}
            src={book?.cover || ''}
            style={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              zIndex: 2,
            }}
          />
        </SkeletonWrapper>

        {/* Book metadata */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <div>
            <SkeletonWrapper isLoading={isLoading} width={300} height={40}>
              <Typography variant="h3" component="h1" sx={{ mt: 2 }}>
                {book?.title || 'Book Title'}
              </Typography>
            </SkeletonWrapper>

            <SkeletonWrapper isLoading={isLoading} width={200} height={30}>
              <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                by {book?.author || 'Author Name'}
              </Typography>
            </SkeletonWrapper>
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
              <SkeletonWrapper isLoading={isLoading} width={150} height={24}>
                <Typography>
                  Provider: {book?.user[0].name || 'Unknown'}
                </Typography>
              </SkeletonWrapper>

              <SkeletonWrapper isLoading={isLoading} width={200} height={32}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Rating value={book?.averageRating || 0} precision={0.5} readOnly />
                  <Typography variant="body1">
                    ({book?.averageRating || 0}/5)
                  </Typography>
                </Stack>
              </SkeletonWrapper>

              <SkeletonWrapper isLoading={isLoading} width={300} height={40}>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip
                    label={book?.genre}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
              </SkeletonWrapper>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
