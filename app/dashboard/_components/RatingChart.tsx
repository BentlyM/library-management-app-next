import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Book as PrismaBook } from '@prisma/client';

interface RatingChartProps {
  books: PrismaBook[];
}

const RatingChart: React.FC<RatingChartProps> = ({ books }) => {
  
  const ratingsData = books.map((book) => ({
    title: book.title,
    rating: book.rating,
  }));

  const maxRating = 5;

  // Create chart data structure
  const chartData = Array.from({ length: maxRating }, (_, rating) => ({
    rating: rating + 1,
    ...ratingsData.reduce((acc, { title, rating: bookRating }) => {
      acc[title] = bookRating >= rating + 1 ? rating + 1 : 0; 
      return acc;
    }, {} as Record<string, number>),
  }));


  const transformedData = chartData.map((data) => ({
    rating: data.rating,
    ...Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== 'rating')
    ),
  }));

  return (
    <ResponsiveContainer width="100%">
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" /> 
        <YAxis />
        <Tooltip />
        {books.map((book) => (
          <Line
            key={book.id}
            type="monotone"
            dataKey={book.title}
            stroke="#8884d8"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RatingChart;
