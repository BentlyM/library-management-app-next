'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteAccount } from './_actions/deleteAccount';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { UpdateAccount } from './_actions/updateAccount';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.name);
        setEmail(data.email);
      })
      .catch(() => setError('Error fetching profile data.'));
  }, []);

  const mutative = useMutation({
    mutationFn: UpdateAccount,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Account update successfully');
      } else {
        toast.error(`Error updating account: ${data.message}`);
      }
    },
    onError: () => toast.error('Internal Server Error'),
  });

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username), formData.append('email', email);
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);

    mutative.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: DeleteAccount,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Account deleted successfully');
        router.push('/login');
      } else {
        toast.error('Error Deleting account');
      }
    },
    onError: () => {
      toast.error('Internal server error...');
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={800}
      margin="auto"
      padding={4}
    >
      <Typography variant="h4">Profile Settings</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleUpdate}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Box>

        <Box mb={3}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={mutation.isPending}
          sx={{ marginTop: 2, padding: '12px 32px' }}
        >
          {mutation.isPending ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </form>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => setOpenDeleteDialog(true)}
        disabled={mutation.isPending}
        sx={{ marginTop: 2, padding: '12px 32px' }}
      >
        Delete Account
      </Button>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <button
            color="red"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid transparent',
              fontSize: '16px',
              color: '#1565c0',
              cursor: 'pointer',
            }}
          >
            {mutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              'Delete Account'
            )}
          </button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSettings;
