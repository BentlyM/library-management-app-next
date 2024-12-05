import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: string }>;
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const theme = useTheme();

  if (active && payload?.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.default, 
          padding: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="body1">{label}</Typography>
        {payload.map((ele, index) => (
          <Box key={index}>
            <Typography
              variant="body2"
              sx={{
                color: 'inherit',
              }}
            >
              {ele.name}: {ele.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  
  return null;
};
