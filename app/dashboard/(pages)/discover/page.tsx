'use client';

import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Carousel from './_components/Carousel/Carousel';
import SampleCard from './_components/TestCards/SampleCard';

const DiscoverPage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
      <Box
        sx={{
          maxWidth: '98vw',
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
            {['','',',','','','',',','',''].map((_, index) => (
              <SampleCard key={index} />
            ))}
          </Carousel>
        </Box>
      </Box>
  );
};

export default DiscoverPage;
