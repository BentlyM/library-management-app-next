'use client';
import FormDialog from '@/app/components/BookDetails';
import { Book } from '@/app/dashboard/_components/BookCard';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

const SampleCard = ({ book }: { book: Book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Card
      sx={{
        height: 200,
        maxWidth: 300,
        minWidth: 200,
        padding: 1,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 !important',
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'inherit',
            opacity: '0.5'
          }}
          gutterBottom
        >
          {book.title || 'rendering...'}
        </Typography>
        <Image src={book.cover} alt={'image'} width={100} height={120} />
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            More
          </Button>
          <FormDialog
            open={open}
            setOpen={setOpen}
            book={book}
            queryKey="public-books"
            readOnly={true}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SampleCard;
