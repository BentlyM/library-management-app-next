'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashCard from './_components/DashCard';

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
  const fetchBookQuery = useQuery<BooksResponse>({
    queryKey: ['books'],
    queryFn: () => fetch(`/api/books/private`).then((res) => res.json()),
  });

  return (
    <>
      {fetchBookQuery.data?.books.length === 0 && <DashCard />}
    </>
  );
};

export default DefaultDashPage;
