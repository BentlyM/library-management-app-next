import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const FooterContent = () => {
  return (
    <Container
      className="foot-content"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        padding: '15px',
        textAlign: 'center',
        maxWidth: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ color: 'white' }}>
          &copy; {new Date().getFullYear()} Library Management System. All
          rights reserved. Not sure what rights i am reserving, but i will
          pretend we're reserving some.
        </Typography>
      </Box>
    </Container>
  );
};

export default FooterContent;
