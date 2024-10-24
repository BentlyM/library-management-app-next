'use client';

import Button from '@mui/material/Button';
import { User } from '@supabase/supabase-js';
import React from 'react';

const ButtonLink = ({
  user,
  paymentLink,
  title,
}: {
  user: User | null;
  paymentLink: string;
  title: string;
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        margin: { xs: '0 auto', md: '0' },
        display: 'block',
        width: 'fit-content',
      }}
      href={!user ? '/login' : paymentLink}
      onClick={() => {
        if (paymentLink && !user) {
          localStorage.setItem('stripePaymentLink', paymentLink);
        }
      }}
    >
      {title?.toLowerCase() === 'basic' ? 'Explore' : 'unavailable'}
    </Button>
  );
};

export default ButtonLink;
