'use client';
import { ReadingProgress } from '@prisma/client';
import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
} from 'recharts';

interface MonthlyReadingProgress {
  month: string;
  completionPercentage: number;
}

interface AreaChartComponentProps {
  readingProgress: ReadingProgress[];
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({
  readingProgress,
}) => {
  const readingProgressData: MonthlyReadingProgress[] = Array.from(
    { length: 12 },
    (_, index) => {
      const monthIndex = index + 1;
      const progress = readingProgress.find(
        (progress) => progress.month === monthIndex
      );
      return {
        month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
          new Date(0, monthIndex - 1)
        ),
        completionPercentage: progress ? progress.completionPercentage : 0,
      };
    }
  );

  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <AreaChart data={readingProgressData}>
        <YAxis />
        <XAxis dataKey={'month'} />
        <CartesianGrid />
        <Area dataKey={'completionPercentage'} fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
