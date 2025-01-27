import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Chip,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import {
  updatePermissions,
  requestVerification,
} from '../dashboard/_actions/updateBook';
import { Book } from '@prisma/client';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  permissions: Partial<{
    isPublic: Book['isPublic'];
    id: Book['id'];
    isVerified: Book['isVerified'];
    isVerificationRequested: any,
  }>;
  queryKey: string;
}

export default function ShareSettingsDialog({
  open,
  setOpen,
  permissions,
  queryKey,
}: Props) {
  const [isPublic, setIsPublic] = React.useState(permissions.isPublic || false);
  const [isVerified, setIsVerified] = React.useState(
    permissions.isVerified || false
  );
  const [isVerificationRequested, setIsVerifiedRequested] = React.useState(permissions.isVerificationRequested || false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const queryClient = useQueryClient();

  const updatePermissionsMutation = useMutation({
    mutationFn: updatePermissions,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`Permissions Updated Successfully ${data.message}`);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      } else {
        toast.error(data.message!);
      }
    },
    onError: () => toast.error('An unexpected error occurred'),
  });

  const requestVerificationMutation = useMutation({
    mutationFn: requestVerification,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`Verification Requested Successfully ${data.message}`);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        setIsVerifiedRequested(true);
      } else {
        toast.error(data.message!);
      }
    },
    onError: () => toast.error('An unexpected error occurred'),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Implement search logic here
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          formData.append('isPublic', String(isPublic));
          formData.append('bookId', permissions.id as string);

          updatePermissionsMutation.mutate(formData);
          setOpen(false);
        },
      }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Share Settings</DialogTitle>
      <DialogContent sx={{ padding: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label="Make Public"
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={isPublic ? 'Public' : 'Private'}
              color={isPublic ? 'success' : 'default'}
            />
            <Chip
              label={
                isVerified
                  ? 'Verified' // If verified, show "Verified"
                  : isVerificationRequested
                  ? 'Pending Verification' // If verification is requested but not yet approved, show "Pending Verification"
                  : 'Not Verified' // Otherwise, show "Not Verified"
              }
              color={
                isVerified
                  ? 'success' // Verified: green
                  : isVerificationRequested
                  ? 'warning' // Pending: yellow/orange
                  : 'default' // Not Verified: default
              }
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              requestVerificationMutation.mutate({
                bookId: permissions.id as string,
              })
            }
            disabled={isVerified || isVerificationRequested}
          >
            Request Verification
          </Button>
          <TextField
            fullWidth
            label="Search Users"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
