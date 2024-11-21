import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { updatePermissions } from '../dashboard/_actions/updateBook';
import { BookPermission } from '@prisma/client';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  permissions: Partial<BookPermission>;
  queryKey: string;
}

export default function ShareSettingsDialog({
  open,
  setOpen,
  permissions,
  queryKey,
}: Props) {
  const [isPublic, setIsPublic] = React.useState(permissions.isPublic);
  const queryClient = useQueryClient();

  const mutation = useMutation({
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
          formData.append('bookId', permissions.bookId as string);

          mutation.mutate(formData);
          setOpen(false);
        },
      }}
    >
      <DialogTitle>Share Settings</DialogTitle>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
