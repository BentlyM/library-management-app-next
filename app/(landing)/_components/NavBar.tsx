// components/NavBar.tsx
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';
export default function NavBar() {
  return (
    <div className="navigation">
      <Box
        padding={'5px'}
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'space-between',
            lg: 'space-between',
            xl: 'space-between',
          },
          alignItems: 'center',
          padding: '15px',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <a href='/' style={{textDecoration: 'none', color: 'black'}}>Library Management</a>
        </Typography>
        <ul
          className="nav-bar"
          style={{
            listStyleType: 'none',
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            margin: '0',
          }}
        >
          <li>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              href={'/services'}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              href={'/login'}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              href={'/register'}
            >
              Register
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </Box>
    </div>
  );
}
