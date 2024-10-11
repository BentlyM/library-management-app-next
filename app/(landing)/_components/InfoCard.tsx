import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface InfoCardType {
  title: string,
  titleHook: string,
  sentence: string,
  width?: string | number,
  height?: string | number,
  align?: string,
  images?: string[] | undefined,
  color?: string,
}

const InfoCard= ({
  title,
  titleHook,
  sentence,
  width,
  height,
  align,
  images,
  color,
}: InfoCardType ) => {
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
      >
        {title && (
          <Typography
            fontSize={'14px'}
            justifySelf={'start'}
            sx={{ letterSpacing: '2px' }}
          >
            {title}
          </Typography>
        )}
        <Typography variant="h6" fontWeight={'bolder'}>
          {titleHook}
        </Typography>
        <Typography>{sentence}</Typography>
        <div className="marquee" style={{width: '100%', justifyContent: 'space-evenly', alignItems:'center', textAlign:'center', gap: '10px'}}>
          {images &&
            images.map((image, index) => (
              <img key={index} src={image} alt="image" />
            ))}
        </div>
        <Button variant="contained" sx={{ width: 'fit-content' }}>
          {title?.toLowerCase() == 'welcome'
            ? 'Explore'
            : title?.toLowerCase() == 'team'
            ? 'im the team'
            : 'Learn More'}
        </Button>
      </Box>
    </>
  );
};

export default InfoCard;
