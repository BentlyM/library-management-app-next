import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Book } from '@prisma/client';
import { Box, Typography } from '@mui/material';
import { DeleteBook } from '../dashboard/_actions/deleteBook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBook } from '../dashboard/_actions/updateBook';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  book: Book;
  queryKey: string;
}

export default function FormDialog({ open, setOpen, book, queryKey }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DeleteBook,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Book Deleted Successfully');
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
      } else {
        toast.error(data.message!);
      }
    },
    onError: () => toast.error('An unexpected error occurred'),
  });

  const mutative = useMutation({
    // running outta names lol
    mutationFn: updateBook,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Book Updated Successfully');
        queryClient.invalidateQueries({
          queryKey: [queryKey],
        });
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
          formData.append('id', book.id);

          mutative.mutate(formData);
          setOpen(false);
        },
      }}
    >
      <DialogTitle>Details</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flexGrow: 1, marginRight: 2 }}>
            <DialogContentText>
              Change/Update Details of Book as needed
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={book.title}
            />
            <TextField
              required
              margin="dense"
              id="author"
              name="author"
              label="Author"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={book.author}
            />
            <TextField
              required
              margin="dense"
              id="summary"
              name="summary"
              label="Summary"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={book.summary}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Created:
                  {new Date(book.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Updated:
                  {new Date(book.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error" // Use 'error' color for better visibility
                sx={{
                  borderColor: 'red',
                  color: 'red',
                  marginLeft: 2,
                  height: 'fit-content', // Ensure it fits nicely
                }}
                onClick={() => {
                  mutation.mutate(book.id);
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Box
            component="img"
            src={book.cover}
            alt="Book Cover"
            sx={{
              width: '30vw',
              height: '30vh',
              objectFit: 'contain',
              marginLeft: 2,
            }}
          />
        </Box>
        <Box sx={{ height: 100, bgcolor: '#f0f0f0', borderRadius: 1, mt: 2 }}>
          {/* going to to put some unique chart data here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
