'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import DashCard from './_components/DashCard';
import BookCard from './_components/BookCard';
import SkeletonWrapper from '../components/SkeletonWrapper';
import {
  Book as PrismaBook,
  ReadingProgress as PrismaReadingProgress,
} from '@prisma/client';
import { Box, Skeleton } from '@mui/material';
import { GenreCountBarChart } from './_components/GenreCountBarChart';
import CompletionPercentageChart from './_components/CompletionChartProps';

export type ReadingProgress = {
  id: string;
  month: number;
  completionPercentage: number;
};

export type Books = {
  books: (PrismaBook & {
    readingProgress: PrismaReadingProgress[];
  })[];
};

const DefaultDashPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const dataContainerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  const fetchBookQuery = useQuery<Books>({
    queryKey: ['books'],
    queryFn: () => fetch(`/api/books/private`).then((res) => res.json()),
  });

  const books = fetchBookQuery.data?.books || [];
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  useEffect(() => {
    if (dataContainerRef.current) {
      const childCount = dataContainerRef.current.childElementCount;
      setCount(childCount);
    }
  }, [filteredBooks]);

  if (fetchBookQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchBookQuery.isError) {
    return <div>Error loading books</div>;
  }

  const noBooks = books.length === 0;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
        },
        gap: '2%',
        overflow: 'hidden',
      }}
    >
      {noBooks && !fetchBookQuery.isFetching && (
        <Box
          sx={{
            width: '100%',
            gridColumn: '1 / -1',
          }}
        >
          <DashCard />
        </Box>
      )}
      {!noBooks && (
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <div
            style={{
              overflowY: 'auto',
              maxHeight: '80vh',
              paddingRight: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1%',
                flexWrap: 'wrap',
              }}
            >
              {filteredBooks.map((book) => (
                <SkeletonWrapper
                  isLoading={
                    fetchBookQuery.isLoading || fetchBookQuery.isFetching
                  }
                  key={book.id}
                >
                  <BookCard book={book} />
                </SkeletonWrapper>
              ))}
              {filteredBooks.length === 0 && <div>Book not found...</div>}
            </div>
          </div>
        </div>
      )}
      <Box
        className="data"
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridTemplateColumns: {
            xs: '1fr',
            sm: count <= 4 ? '1fr' : 'repeat(2, 1fr)',
          },
          gap: '10px',
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
        ref={dataContainerRef}
      >
        {fetchBookQuery.isLoading || fetchBookQuery.isFetching ? (
          <>
            {' '}
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <GenreCountBarChart books={books} />
            <CompletionPercentageChart books={books} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default DefaultDashPage;
