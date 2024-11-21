'use client';

import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Carousel from './_components/Carousel/Carousel';
import SampleCard from './_components/TestCards/SampleCard';
import { useDrawer } from '@/app/components/providers/DrawerProvider';
import { useQuery } from '@tanstack/react-query';
import { Books } from '../../page';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';

const DiscoverPage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { open, drawerWidth } = useDrawer();

  const fetchPublicBookQuery = useQuery<Books>({
    queryKey: ['public-books'],
    queryFn: () => fetch(`/api/books/public`).then((res) => res.json()),
  });

  const books = fetchPublicBookQuery.data?.books || [];
  
  return (
    <Box
      sx={{
        width: {
          xs: '98vw',
          md: `calc(98vw - ${open ? drawerWidth : 0}px)`,
        },
        border: '1px dotted red',
        padding: '10px',
      }}
    >
      <Button color="primary" onClick={() => setCollapsed(!collapsed)}>
        Collapse
      </Button>

      <Box
        style={{
          padding: '15px 0',
          margin: '10px 0',
          border: '1px dotted red',
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
  );
};

export default DiscoverPage;
