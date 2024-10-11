'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
} from '@mui/material';
import bibliophile from '../../public/bibliophile.svg';
import { register } from './_actions/register';
import { useSearchParams } from 'next/navigation';

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const urlParams = useSearchParams()

  useEffect(() => {
    if (urlParams.has('error')) {
      const error = urlParams.get('error');
      setErrorMessage(decodeURIComponent(error as string)); // Decode the error message
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '80%',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            flex: 1,
            height: 'fit-content',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bolder', mb: 2 }}>
            Sign Up
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ mb: 2, color: 'red'}}>
              {errorMessage}
            </Typography>
          )}

          <form id="register-form" action={register}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Your email"
                variant="outlined"
                type="email"
                name="email"
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Repeat Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                required
              />
            </Box>

            <FormControlLabel
              control={<Checkbox name="agree-term" color="primary" />}
              label={
                <span>
                  I agree to all statements in{' '}
                  <Link href="#" underline="hover">
                    Terms of Service
                  </Link>
                </span>
              }
            />
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={undefined}
              >
                Register
              </Button>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <img
            src={bibliophile.src}
            alt="Sign Up"
            style={{ width: '300px', height: 'auto' }}
          />
          <Link href="/auth/login" sx={{ mt: 2 }}>
            I am already a member
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default SignUp;
