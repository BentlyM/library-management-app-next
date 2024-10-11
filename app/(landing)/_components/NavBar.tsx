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
          justifyContent: 'space-between', // Change to space-between for better centering
          alignItems: 'center',
          padding: '15px',
          maxWidth: '1200px', // Limit width for better centering
          margin: '0 auto', // Center horizontally
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
          Library Management
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
              style={{ textDecoration: 'none', color: 'black'}} 
              href={'pricing'}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none', color: 'black'}} 
              href={'auth/login'}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: 'none', color: 'black'}} 
              href={'auth/register'}
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
