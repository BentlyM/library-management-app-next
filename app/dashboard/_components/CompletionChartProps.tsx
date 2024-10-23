import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Books } from '../page';

const CompletionPercentageChart = ({ books }: Books) => {
  const totalBooks = books.length;
  const completedBooks = books.filter((book) =>
    book.readingProgress.some(
      (progress) => progress.completionPercentage >= 100
    )
  ).length;

  const data = [
    { name: 'Completed', value: completedBooks },
    { name: 'Not Completed', value: totalBooks - completedBooks },
  ];

  return (
    totalBooks !== 0 && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <span>Books Completed</span>
        <ResponsiveContainer width="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  );
};

export default CompletionPercentageChart;
