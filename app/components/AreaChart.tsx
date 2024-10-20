'use client';
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
  hoursRead: number;
}

const readingProgressData: MonthlyReadingProgress[] = [
  { month: 'January', hoursRead: 10 },
  { month: 'February', hoursRead: 8 },
  { month: 'March', hoursRead: 12 },
  { month: 'April', hoursRead: 4 },
  { month: 'May', hoursRead: 5 },
  { month: 'June', hoursRead: 18 },
  { month: 'July', hoursRead: 20 },
  { month: 'August', hoursRead: 20 },
  { month: 'September', hoursRead: 12 },
  { month: 'October', hoursRead: 15 },
  { month: 'November', hoursRead: 10 },
  { month: 'December', hoursRead: 5 },
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer
      width={'100%'}
      height={'100%'}
    >
      <AreaChart data={readingProgressData}>
        <YAxis />
        <XAxis dataKey={'month'} />
        <CartesianGrid />
        <Area dataKey={'hoursRead'} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;