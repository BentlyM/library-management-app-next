'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // Import the useDebounce hook
import DashCard from './_components/DashCard';
import BookCard from './_components/BookCard';
import SkeletonWrapper from '../components/SkeletonWrapper';

export interface Book {
  title: string;
  author: string;
  summary: string;
  genre: string;
  cover: string;
}

type BooksResponse = {
  books: Book[];
};

const DefaultDashPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const fetchBookQuery = useQuery<BooksResponse>({
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
                  key={book.title}
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
        <span
          style={{ margin: 'none', fontWeight: 'normal', fontSize: '1.5rem' }}
        >
          Data
        </span>
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateRows: '[row-1-start] 1fr [row-2-start] 1fr [row-2-end]',
            gridTemplateColumns: '[col-1-start] 1fr [col-2-start] 1fr',
          }}
        >
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashPage;
