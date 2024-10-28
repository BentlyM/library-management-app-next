'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { register } from './_actions/register';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data && typeof data.success !== 'undefined') {
        if (!data.success) {
          toast.error(data.message);
        } else {
          toast.success('Login successful');
        }
      } else {
        toast.success('Login successful (success state undefined)'); // due to the redirect
      }
    },
    onError: () => toast.error('An unexpected error occurred'),
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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '50%',
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
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'start',
            flex: 1,
            height: 'fit-content',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bolder',
                mb: 2,
                textAlign: { xs: 'center', sm: 'start' },
              }}
            >
              Sign Up
            </Typography>

            <form
              id="register-form"
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mb: 2, display: 'flex' }}>
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
              <FormControl sx={{ mb: 2 }} variant="outlined">
                <InputLabel htmlFor="password">Password *</InputLabel>
                <OutlinedInput
                  fullWidth
                  sx={{ width: '250px' }}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl sx={{ mb: 2 }} variant="outlined">
                <InputLabel htmlFor="confirmPassword">
                  Repeat Password *
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  sx={{ width: '250px' }}
                  label="Repeat Password"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

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
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Loading...' : 'Register'}
                </Button>
              </Box>
            </form>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                  md: 'flex',
                  lg: 'flex',
                  xl: 'flex',
                },
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Image
                src="/image/bibliophile.svg"
                alt="Sign Up"
                style={{ width: '300px', height: 'auto' }}
                width={250}
                height={250}
              />
            </Box>
            <Link href="/login" sx={{ mt: 2 }}>
              I am already a member
            </Link>
            <Link href="/" sx={{ textDecoration: 'none', color: 'black' }}>
              Back to Landing
            </Link>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default SignUp;
