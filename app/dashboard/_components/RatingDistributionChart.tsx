import { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import SubBlur from '@/app/components/SubBlur';
import { Books } from '../page';

interface RatingDistribution {
  rating: number;
  count: number;
}

interface RatingDistributionChartProps {
  books: Books['books'];
  isSubscribed: boolean;
}

export function RatingDistributionChart({
  books,
  isSubscribed,
}: RatingDistributionChartProps) {
  const [ratingCounts, setRatingCounts] = useState<RatingDistribution[]>([]);

  useEffect(() => {
    const ratingMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    books.forEach((book) => {
      const rating = book.rating; // 1-5
      if (ratingMap[rating] !== undefined) {
        ratingMap[rating] += 1;
      }
    });

    const formattedData: RatingDistribution[] = Object.entries(ratingMap)
      .map(([rating, count]) => ({
        rating: Number(rating),
        count,
      }))
      .filter(({ count }) => count > 0);

    setRatingCounts(formattedData);
  }, [books]);

  return (
    ratingCounts.length > 0 && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <span>Ratings Distribution</span>
        <ResponsiveContainer width="100%">
          <BarChart data={ratingCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
        {!isSubscribed && (
          <SubBlur link="/services">Subscribe to view this chart</SubBlur>
        )}
      </div>
    )
  );
}
