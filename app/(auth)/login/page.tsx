'use client';

import {
  Container,
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material';
import { login } from './_actions/login';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: login,
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
      email: { value: string };
      password: { value: string };
    };

    target.email.value = '';
    target.password.value = '';
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
        minWidth: '80%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          gap: '25px',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
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
              src={'/image/book-lover.svg'}
              alt="Sign In"
              style={{ maxWidth: '300px', height: 'auto' }}
              width={250}
              height={250}
            />
          </Box>
          <Link href="/register" sx={{ mt: 2 }}>
            Create an account
          </Link>
          <Link href="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Back to Landing
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bolder', mb: 2 }}>
            Log In
          </Typography>

          <form
            id="login-form"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }}
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                required
                disabled={mutation.isPending}
              />
            </Box>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
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
                disabled={mutation.isPending}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox name="remember-me" color="primary" />}
              label="Remember me"
            />
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'loading...' : 'Login'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
