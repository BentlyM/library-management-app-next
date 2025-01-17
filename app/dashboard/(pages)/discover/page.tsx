'use client';

import { Box } from '@mui/system';
import React from 'react';
import Carousel from './_components/Carousel/Carousel';
import { useDrawer } from '@/app/components/providers/DrawerProvider';
import { useQuery } from '@tanstack/react-query';
import { Books } from '../../page';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';
import dynamic from 'next/dynamic';

const SampleCard = dynamic(() => import('./_components/TestCards/SampleCard'), {
  loading: () => <div>loading...</div>,
});

const DiscoverPage = () => {
  const { open, drawerWidth } = useDrawer();
  const fetchPublicBookQuery = useQuery<Books>({
    queryKey: ['public-books'],
    queryFn: () =>
      fetch(`/api/books/public`, { cache: 'no-cache' }).then((res) =>
        res.json()
      ),
    refetchInterval: 60 * 1000, // Revalidate every 60 seconds
  });

  const books = fetchPublicBookQuery.data?.books || [];

  return (
    <>
      <Box
        sx={{
          width: {
            xs: '98vw',
            md: `calc(98vw - ${open ? drawerWidth : 0}px)`,
          },
          padding: '10px',
        }}
      >
        <span style={{ fontSize: 'larger' }}>Self-Published</span>
        <Box
          style={{
            padding: '15px 0',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Carousel>
            {books.map((data, index) => (
              <SkeletonWrapper
                isLoading={fetchPublicBookQuery.isFetching}
                key={index}
              >
                <SampleCard book={data} />
              </SkeletonWrapper>
            ))}
          </Carousel>
        </Box>
      </Box>
      <Box
        sx={{
          width: {
            xs: '98vw',
            md: `calc(98vw - ${open ? drawerWidth : 0}px)`,
          },
          padding: '10px',
        }}
      >
        <span style={{ fontSize: 'larger' }}>Editor Picks</span>
      </Box>
      <Box
        sx={{
          width: {
            xs: '98vw',
            md: `calc(98vw - ${open ? drawerWidth : 0}px)`,
          },
          padding: '10px',
        }}
      >
        <span style={{ fontSize: 'larger' }}>Verified Literature</span>
      </Box>
    </>
  );
};

export default DiscoverPage;
