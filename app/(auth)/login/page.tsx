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
} from '@mui/material';
import { login } from './_actions/login';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

const Login = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('login successful');
    },
    onError: (error: Error) => {
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
      email: { value: string };
      password: { value: string };
    };

    target.email.value = '';
    target.password.value = '';
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
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
          gap: '25px',
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
          <Image
            src={'/image/book-lover.svg'}
            alt="Sign In"
            style={{ maxWidth: '300px', height: 'auto' }}
            width={250}
            height={250}
          />
          <Link href="/register" sx={{ mt: 2 }}>
            Create an account
          </Link>
          <Link href="/" sx={{ textDecoration: 'none', color: 'black' }}>
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
                sx={{ width: '250px' }} // Adjust the width here
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                sx={{ width: '250px' }} // Adjust the width here
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                required
              />
            </Box>
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
      </div>
    </Container>
  );
};

export default Login;