import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface InfoCardType {
  title: string;
  titleHook: string;
  sentence: string;
  width?: string | number;
  height?: string | number;
  align?: string;
  images?: string[] | undefined;
  color?: string;
}

const InfoCard = ({
  title,
  titleHook,
  sentence,
  width,
  height,
  align,
  images,
  color,
}: InfoCardType) => {
  return (
    <>
      <Box
        minWidth={width}
        maxWidth={width}
        height={height}
        display="flex"
        flexDirection={'column'}
        flexWrap={'wrap'}
        gap={2}
        p={2}
        color={color}
        alignItems={align}
        textAlign="center" // Center align text
      >
        {title && (
          <Typography
            fontSize={'14px'}
            justifySelf={'start'}
            sx={{
              letterSpacing: '2px',
              textAlign: {
                xs: 'center',
                sm: 'center',
                md: 'start',
                lg: 'start',
                xl: 'start',
              },
            }}
          >
            {title}
          </Typography>
        )}
        <Typography
          variant="h6"
          fontWeight={'bolder'}
          sx={{
            fontSize: {
              xs: '1rem',
              sm: '1rem',
              md: '1rem',
              lg: '1rem',
              xl: '1rem',
            },
            textAlign: {
              xs: align || 'center',
              sm: align || 'center',
              md: 'start',
              lg: 'start',
              xl: 'start',
            },
          }}
        >
          {titleHook}
        </Typography>
        <Typography
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'center',
              md: 'start',
              lg: 'start',
              xl: 'start',
            },
            fontSize: {
              xs: '1rem',
              sm: '1rem',
              md: '1rem',
              lg: '1rem',
              xl: '1rem',
            },
          }}
        >
          {sentence}
        </Typography>
        <div
          className="marquee"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {images &&
            images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="image"
                height={60}
                width={70}
              />
            ))}
        </div>
        <Button
          variant="contained"
          sx={{
            margin: { xs: '0 auto', md: '0' }, // Center for xs and sm, start for md and up
            display: 'block', // Ensure it behaves like a block element
            width: 'fit-content', // Ensure it doesn't stretch
            textAlign: { xs: 'center', md: 'left' }, // Center text for small, left for larger
          }}
        >
          {title?.toLowerCase() === 'welcome'
            ? 'Explore'
            : title?.toLowerCase() === 'team'
            ? 'im the team'
            : 'Learn More'}
        </Button>
      </Box>
    </>
  );
};

export default InfoCard;
