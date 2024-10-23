import { useEffect, useState } from 'react';
import { Books } from '../page';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface GenreCount {
  genre: string;
  count: number;
}

export function GenreCountBarChart({ books }: Books) {
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
        }}
      >
        <span>Genre</span>
        <ResponsiveContainer width="100%">
          <BarChart data={genreCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  );
}
