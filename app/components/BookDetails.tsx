import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextareaAutosize, Typography } from '@mui/material';
import { DeleteBook } from '../dashboard/_actions/deleteBook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBook } from '../dashboard/_actions/updateBook';
import AreaChartComponent from './AreaChart';
import { Line } from 'rc-progress';
import GroupedButtons from './GroupedButtons';
import HoverRating from './HoverRating';
import { Book } from '../dashboard/_components/BookCard';
import SubBlur from './SubBlur';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  book: Book;
  queryKey: string;
  readOnly?: boolean;
}

const getCurrentMonth = () => new Date().getMonth() + 1;

export default function FormDialog({
  open,
  setOpen,
  book,
  queryKey,
  readOnly,
}: Props) {
  const currentMonth = getCurrentMonth();

  const currentProgress = book.readingProgress?.find(
    (progress) => progress.month === currentMonth
  );

  const [value, setValue] = React.useState<number | null>(book.rating);
  const [hover, setHover] = React.useState(-1);
  const [counter, setCounter] = React.useState(
    currentProgress?.completionPercentage || 0
  );
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
          if (!readOnly) {
            const formData = new FormData(event.currentTarget);
            formData.append('id', book.id);
            formData.append('rating', String(value));
            formData.append('progress', String(counter));

            mutative.mutate(formData);
            setOpen(false);
          } else {
            alert('Error unable to update');
          }
        },
      }}
    >
      <DialogTitle>Details</DialogTitle>
      <DialogContent sx={{ padding: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <DialogContentText
              style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}
            >
              {!readOnly && (
                <GroupedButtons counter={counter} setCounter={setCounter} />
              )}
              <HoverRating
                value={value}
                hover={hover}
                setHover={setHover}
                setValue={setValue}
                readOnly={readOnly}
              />
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
              disabled={readOnly}
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
              disabled={readOnly}
            />
            {readOnly ? (
              <div>
                Summary:
                <TextareaAutosize
                  value={book.summary}
                  disabled={readOnly}
                  style={{
                    resize: 'none',
                    width: '100%',
                    overflowY: 'scroll',
                    background: 'inherit',
                    border: 'none',
                  }}
                />
              </div>
            ) : (
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
            )}
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
                  Created: {new Date(book.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Updated: {new Date(book.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
              {!readOnly && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    borderColor: 'red',
                    color: 'red',
                    marginLeft: 2,
                    height: 'fit-content',
                  }}
                  onClick={() => {
                    mutation.mutate(book.id);
                  }}
                  disabled={readOnly}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
          <Box
            component="img"
            src={book.cover}
            alt="Book Cover"
            sx={{
              width: { xs: '100%', sm: '30vw' },
              height: { xs: '30vh', sm: '30vh' },
              objectFit: 'contain',
              marginTop: { xs: 2, sm: 0 },
            }}
          />
        </Box>
        <Box
          sx={{
            height: 100,
            bgcolor: 'inherit',
            borderRadius: 1,
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!readOnly ? (
            <AreaChartComponent readingProgress={book.readingProgress} />
          ) : (
            <div
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {readOnly && <SubBlur link={''} >Coming Soon</SubBlur>}
              {/*WHAT DATA ARE YOU GOING TO PUT HERE????*/}
            </div>
          )}
        </Box>
        {!readOnly && (
          <Box>
            <Typography
              sx={{
                opacity: 0.7,
                fontSize: {
                  xs: 'small',
                  sm: 'small',
                  md: 'medium',
                },
                textAlign: 'center',
                marginTop: '5px',
              }}
            >
              <em>Reading Progress</em>
            </Typography>
            <Line style={{ height: '5px', width: '100%' }} percent={counter} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {readOnly && <Button>More</Button>}
        {!readOnly && <Button type="submit">Update</Button>}
      </DialogActions>
    </Dialog>
  );
}
