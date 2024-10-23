'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import DashCard from './_components/DashCard';
import BookCard from './_components/BookCard';
import SkeletonWrapper from '../components/SkeletonWrapper';
import {
  Book as PrismaBook,
  ReadingProgress as PrismaReadingProgress,
} from '@prisma/client';
import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

const mockData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

const DefaultDashPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchBookQuery = useQuery<Books>({
    queryKey: ['books'],
    queryFn: () => fetch(`/api/books/private`).then((res) => res.json()),
  });

  if (fetchBookQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchBookQuery.isError) {
    return <div>Error loading books</div>;
  }

  const books = fetchBookQuery.data?.books || [];
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

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
      {noBooks && !fetchBookQuery.isFetching && <DashCard />}
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
            sm:  false ? '1fr' : 'repeat(2, 1fr)', // if there is only one chart of data display one chart fill width
          },
          gap: '10px',
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} style={{ height: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default DefaultDashPage;
