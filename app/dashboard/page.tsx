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
  User,
} from '@prisma/client';
import { Box, Skeleton, MenuItem, Select, FormControl } from '@mui/material';
import { GenreCountBarChart } from './_components/GenreCountBarChart';
import CompletionPercentageChart from './_components/CompletionChartProps';
import { redirect } from 'next/navigation';
import { RatingRadarChart } from './_components/RatingChart';
import { RatingDistributionChart } from './_components/RatingDistributionChart';

export type Books = {
  books: (PrismaBook & {
    readingProgress: PrismaReadingProgress[];
  })[];
};

const DefaultDashPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | ''>('');
  const dataContainerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const stripePaymentLink = localStorage.getItem('stripePaymentLink');
    localStorage.removeItem('stripePaymentLink');
    if (stripePaymentLink && user?.plan === 'FREE') {
      redirect(stripePaymentLink);
    }
    fetch('/api/user')
      .then((res) => res.json())
      .then((data: User) => setUser(data));
  }, []);

  const fetchBookQuery = useQuery<Books>({
    queryKey: ['books'],
    queryFn: () => fetch(`/api/books/private`).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  const books = fetchBookQuery.data?.books || [];

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm = book.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesRating = selectedRating
      ? book.rating === selectedRating
      : true;

    return matchesSearchTerm && matchesGenre && matchesRating;
  });

  const noBooks = books.length === 0;

  const genres = Array.from(new Set(books.map((book) => book.genre)));

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
        <Box sx={{ width: '100%', gridColumn: '1 / -1' }}>
          <DashCard />
        </Box>
      )}
      {!noBooks && (
        <div style={{ width: '100%', position: 'relative' }}>
          <ul
            style={{
              display: 'flex',
              listStyleType: 'none',
              padding: 0,
              justifyContent: 'end',
              margin: 0,
            }}
          >
            <li>
              <FormControl
                variant="outlined"
                size="small"
                style={{ marginRight: '5px' }}
              >
                <Select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Genre</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
            <li>
              <FormControl variant="outlined" size="small">
                <Select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value as number)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Rating</em>
                  </MenuItem>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </li>
          </ul>
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
      {!noBooks && (
        <Box
          className="data"
          sx={{
            display: 'grid',
            gridTemplateRows: `repeat(${count}, minmax(200px, auto))`,
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
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <GenreCountBarChart
                books={books}
                isSubscribed={user?.plan === 'SUBSCRIPTION'}
              />
              <CompletionPercentageChart
                books={books}
                isSubscribed={user?.plan === 'SUBSCRIPTION'}
              />
              <RatingRadarChart
                books={books}
                isSubscribed={user?.plan === 'SUBSCRIPTION'}
              />
              <RatingDistributionChart
                books={books}
                isSubscribed={user?.plan === 'SUBSCRIPTION'}
              />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DefaultDashPage;
