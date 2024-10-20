'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // Import the useDebounce hook
import DashCard from './_components/DashCard';
import BookCard from './_components/BookCard';
import SkeletonWrapper from '../components/SkeletonWrapper';
import {
  Book as PrismaBook,
  ReadingProgress as PrismaReadingProgress,
} from '@prisma/client'; // Adjust the import based on your project structure

export type ReadingProgress = {
  id: string;
  month: number;
  completionPercentage: number;
};

// If you are using the PrismaBook type directly:
export type Books = {
  books: (PrismaBook & {
    readingProgress: PrismaReadingProgress[];
  })[];
};
const DefaultDashPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchBookQuery = useQuery<Books>({
    queryKey: ['books'],
    queryFn: () => fetch(`/api/books/private`).then((res) => res.json()),
  });

  if (fetchBookQuery.isLoading) {
    return <div>Loading...</div>; // prob gonna change this to some sorta dash skeleton for the internet lol
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        gap: '2%',
      }}
    >
      {noBooks && !fetchBookQuery.isFetching && <DashCard />}
      {!noBooks && (
        <div style={{ width: '45%', position: 'relative' }}>
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
      <div
        className="data"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '45%',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default DefaultDashPage;
