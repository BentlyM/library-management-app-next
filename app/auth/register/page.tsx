'use client';

import React from 'react';
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
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const SignUp = () => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('register successful');
    },
    onError: (error: any) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    mutation.mutate(formData);

    const target = event.currentTarget as HTMLFormElement & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
    };

    target.username.value = '';
    target.email.value = '';
    target.password.value = '';
    target.confirmPassword.value = '';
  };

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

          <form id="register-form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Email"
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
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'loading...' : 'Register'}
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
          <Link href="/" sx={{ textDecoration: 'none', color: 'black' }}>
            Back to Landing
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default SignUp;
