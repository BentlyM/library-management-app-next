'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { Book } from '@/app/dashboard/_components/BookCard';
import FormDialog from '@/app/components/BookDetails';
import { useRouter } from 'next/navigation';

const LayoutCard = ({ book }: { book: Book }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
            '& .buttons': {
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

        <Box
          className="text"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            zIndex: 2,
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.1s ease-in-out',
            top: '10px',
            height: '80%',
            width: '90%',
            overflowY: 'auto',
            paddingRight: '10px',
          }}
        >
          {book.summary || 'rendering...'}
        </Box>

        <Box
          className="buttons"
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            justifyContent: 'end',
            position: 'absolute',
            zIndex: 2,
            gap: '2px',
            bottom: '10px',
            width: '90%',
            opacity: 0,
            transition: 'opacity 0.1s ease-in-out',
          }}
        >
          <button
            style={{
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            Details
          </button>
          <button
            style={{
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/discover/${book.id}`);
            }}
          >
            More →
          </button>
        </Box>
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
