'use client';

import { Button } from '@mui/material';
import { Box, width } from '@mui/system';
import React, { useState } from 'react';
import Carousel from './_components/carousel/Carousel';
import CardOne from './_components/TestCards/CardOne';

const DiscoverPage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px dotted red',
        padding: '10px',
      }}
    >
      <Button color="primary" onClick={() => setCollapsed(!collapsed)}>
        Collapse
      </Button>

      <Box
        sx={{
          padding: '15px 0',
          margin: '10px 0',
          border: '1px dotted red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Carousel>
          {['','','','',''].map((_, index) => (
            <CardOne key={index}/>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default DiscoverPage;
