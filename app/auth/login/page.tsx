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
import bookLoverPng from '../../public/book-lover.svg';
import { login } from './_actions/login';

const Login = () => {
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
          <img
            src={bookLoverPng.src}
            alt="Sign In"
            style={{ maxWidth: '300px', height: 'auto' }}
          />
          <Link href="/auth/register" sx={{ mt: 2 }}>
            Create an account
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
            action={login}
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
                disabled={undefined}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
