import { useEffect, useState } from 'react';
import { Books } from '../page';
import {
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarChart,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import SubBlur from '@/app/components/SubBlur';
import { CustomTooltip } from '@/app/components/CustomTooltip';

interface RatingData {
  genre: string;
  rating: number; // 1-5
}

interface RatingRadarChartProps {
  books: Books['books'];
  isSubscribed: boolean;
}

export function RatingRadarChart({
  books,
  isSubscribed,
}: RatingRadarChartProps) {
  const [ratings, setRatings] = useState<RatingData[]>([]);

  useEffect(() => {
    const genreRatings: Record<string, { total: number; count: number }> = {};

    books.forEach((book) => {
      const { genre, defaultRating } = book;

      if (!genreRatings[genre]) {
        genreRatings[genre] = { total: 0, count: 0 };
      }
      genreRatings[genre].total += defaultRating;
      genreRatings[genre].count += 1;
    });

    const formattedData: RatingData[] = Object.entries(genreRatings).map(
      ([genre, { total, count }]) => ({
        genre,
        rating: total / count, 
      })
    );

    setRatings(formattedData);
  }, [books]);

  return (
    ratings.length !== 0 && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <span>Average Ratings by Genre</span>
        <ResponsiveContainer width="100%">
          <RadarChart data={ratings}>
            <PolarGrid />
            <PolarAngleAxis dataKey="genre" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar
              name="Average Rating"
              dataKey="rating"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip cursor={{fill: 'inherit', opacity: '0.2'}} content={<CustomTooltip active={false} payload={[]} label={''} />}/>
          </RadarChart>
        </ResponsiveContainer>
        {!isSubscribed && (
          <SubBlur link="/services">Subscribe to view this chart</SubBlur>
        )}
      </div>
    )
  );
}
