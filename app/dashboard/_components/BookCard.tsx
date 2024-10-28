import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormDialog from '@/app/components/FormDialog';
import ShareSettingsDialog from '@/app/components/ShareSettingsDialog'; // Import your new component
import { Box } from '@mui/material';
import { ReadingProgress } from '@prisma/client';

export type Book = {
  summary: string;
  title: string;
  id: string;
  cover: string;
  author: string;
  genre: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
} & {
  readingProgress: ReadingProgress[];
};

export default function BookCard({ book }: { book: Book }) {
  const [open, setOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false); // State for share settings dialog

  const handleOpen = () => {
    setOpen(true);
  };

  const handleShareOpen = () => {
    setShareOpen(true);
  };

  return (
    <Card sx={{ maxWidth: 300, padding: 2, margin: 1 }}>
      <CardMedia
        component="img"
        alt="Book Cover"
        height="200"
        image={book.cover}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign={{ xs: 'center', sm: 'start' }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            textAlign: { xs: 'center', sm: 'start' },
          }}
        >
          {book.summary}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mt: 1,
            textAlign: { xs: 'center', sm: 'start' },
          }}
        >
          Author: {book.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            padding: '1rem',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Button size="small" onClick={handleShareOpen}>
            Share
          </Button>{' '}
          <Button onClick={handleOpen}>Details</Button>
        </Box>
        <FormDialog
          open={open}
          setOpen={setOpen}
          book={book}
          queryKey="books"
        />
        <ShareSettingsDialog
          open={shareOpen}
          setOpen={setShareOpen}
          permissions={{
            bookId: book.id,
            isPublic: false,
          }}
          queryKey="permissions"
        />
      </CardActions>
    </Card>
  );
}
