import { useEffect, useState } from 'react';
import { Books } from '../page';
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

interface GenreCount {
  genre: string;
  count: number;
}

interface GenreCountBarChartProps {
  books: Books['books'];
  isSubscribed: boolean; // New prop to check subscription status
}

export function GenreCountBarChart({
  books,
  isSubscribed,
}: GenreCountBarChartProps) {
  const [genreCounts, setGenreCounts] = useState<GenreCount[]>([]);

  useEffect(() => {
    const genreMap: Record<string, number> = {};

    books.forEach((book) => {
      const genre = book.genre;
      if (!genreMap[genre]) {
        genreMap[genre] = 0;
      }
      genreMap[genre] += 1;
    });

    const formattedData: GenreCount[] = Object.entries(genreMap).map(
      ([genre, count]) => ({
        genre,
        count,
      })
    );

    setGenreCounts(formattedData);
  }, [books]);

  return (
    genreCounts.length !== 0 && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative', // Position relative for overlay
        }}
      >
        <span>Genre Read</span>
        <ResponsiveContainer width="100%">
          <BarChart data={genreCounts}> {/*i could make it so that the data does not show either but*/}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
        {!isSubscribed && (
          <SubBlur link="/services">Subscribe to view this chart</SubBlur>
        )}
      </div>
    )
  );
}
