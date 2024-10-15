import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Book } from '../page';

export default function BookCard({ book }: { book: Book }) {
  return (
    <Card sx={{ maxWidth: 300, padding: 2 , margin: 1}}>
      <CardMedia
        component="img"
        alt="Book Cover"
        height="200"
        image={book.cover}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {book.summary}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Author: {book.author} {/* Added author */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}
