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
  hasButton?: boolean;
  center?: boolean;
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
  hasButton = true,
  center,
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
        textAlign="center"
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
                md: 'center',
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
              md: 'center',
              lg: 'start',
              xl: 'start',
            },
          }}
        >
          {titleHook}
        </Typography>
        <Typography
          sx={{
            width: {
              xs: '90vw',
              sm: width,
            },
            textAlign: {
              xs: 'center',
              sm: 'center',
              md: 'center',
              lg: `${center ? 'center' : 'start'}`,
              xl: `${center ? 'center' : 'start'}`,
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
        {hasButton && (
          <Button
            variant="contained"
            sx={{
              margin: { xs: '0 auto', md: '0' },
              display: 'block',
              width: 'fit-content',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {title?.toLowerCase() === 'welcome'
              ? 'Explore'
              : title?.toLowerCase() === 'team'
              ? 'im the team'
              : 'Learn More'}
          </Button>
        )}
      </Box>
    </>
  );
};

export default InfoCard;
