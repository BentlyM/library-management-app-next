import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
  0.5: 'Terrible',
  1: 'Trash',
  1.5: 'Poor',
  2: 'Poor',
  2.5: 'Okay',
  3: 'Okay',
  3.5: 'Good',
  4: 'Good',
  4.5: 'Very Good',
  5: 'Excellent',
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({
  value,
  hover,
  setValue,
  setHover,
  readOnly,
}: {
  value: number | null;
  hover: number;
  setValue: (value: number | null) => void;
  setHover: (value: number) => void;
  readOnly?: boolean;
}) {
  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={readOnly ? 0.5 : 1}
        getLabelText={getLabelText}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        disabled={readOnly}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
