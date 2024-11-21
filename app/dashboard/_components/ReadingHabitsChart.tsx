import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import SubBlur from '@/app/components/SubBlur';
import { Books } from '../page';

interface ReadingData {
  month: string;
  count: number;
}

interface ReadingHabitsChartProps {
  books: Books['books'];
  isSubscribed: boolean;
}

export function ReadingHabitsChart({
  books,
  isSubscribed,
}: ReadingHabitsChartProps) {
  const [readingData, setReadingData] = useState<ReadingData[]>([]);

  useEffect(() => {
    const monthlyCounts: Record<string, number> = {};

    books.forEach((book) => {
      const month = new Date(book.createdAt).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      if (!monthlyCounts[month]) {
        monthlyCounts[month] = 0;
      }
      monthlyCounts[month] += 1;
    });

    const formattedData: ReadingData[] = Object.entries(monthlyCounts).map(
      ([month, count]) => ({
        month,
        count,
      })
    );

    setReadingData(formattedData);
  }, [books]);

  return (
    readingData.length !== 0 && (
      <div>
        <span>Reading Habits Over Time</span>
        <ResponsiveContainer width="100%">
          <LineChart data={readingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
        {!isSubscribed && (
          <SubBlur link="/services">Subscribe to view this chart</SubBlur>
        )}
      </div>
    )
  );
}
