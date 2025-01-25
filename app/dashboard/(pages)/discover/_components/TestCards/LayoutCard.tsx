'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { Book } from '@/app/dashboard/_components/BookCard';
import FormDialog from '@/app/components/BookDetails';

const LayoutCard = ({ book }: { book: Book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'hsla(0, 2.10%, 9.20%, 0.60)',
              zIndex: 1,
            },
            '& .text': {
              opacity: 1,
            },
          },
        }}
        onClick={() => handleOpen()}
      >
        <Image
          src={book.cover}
          alt={'test'}
          width={200}
          height={250}
          style={{ zIndex: 0 }}
        />

        <Typography
          className="text"
          sx={{
            position: 'absolute',
            zIndex: 2,
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.1s ease-in-out',
            display: { xs: 'none', sm: 'block' },
            bottom: '10px',
            overflowY: 'auto',
          }}
        >
          {book.summary || 'rendering...'}
        </Typography>
      </Box>

      <FormDialog
        open={open}
        setOpen={setOpen}
        book={book}
        queryKey="public-books"
        readOnly={true}
      />

      <Typography
        className="text"
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'inherit',
          width: '150px',
          textAlign: 'center',
        }}
      >
        {book.title || 'rendering...'}
      </Typography>
    </>
  );
};

export default LayoutCard;
