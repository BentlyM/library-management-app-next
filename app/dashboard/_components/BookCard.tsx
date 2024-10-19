import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormDialog from '@/app/components/FormDialog';
import { Book } from '@prisma/client';
import { Box, useTheme } from '@mui/material';

export default function BookCard({ book }: { book: Book }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
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
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
            padding: '1rem', // Padding around the buttons
            width: '100%', // Full width
            margin: '0 auto', // Center the box
          }}
        >
          <Button size="small">Share</Button>
          <Button onClick={handleOpen}>Details</Button>
        </Box>
        <FormDialog
          open={open}
          setOpen={setOpen}
          book={book}
          queryKey="books"
        />
      </CardActions>
    </Card>
  );
}
