'use client';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Children, cloneElement, CSSProperties, useState } from 'react';

const Carousel = ({
  children,
  stepSize = 1,
  cardDist = 13,
  navOnTop = false,
}: {
  children: JSX.Element[];
  stepSize?: number;
  cardDist?: number;
  navOnTop?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const wrapCard = (baseCard: React.JSX.Element, index: number) => {
    return (
      <Box
        sx={
          index === children.length - 1
            ? undefined
            : ({
                paddingRight: `${cardDist}px`,
                zIndex: children.length - index,
              } as CSSProperties)
        }
      >
        {baseCard}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexFlow: 'column nowrap',
        paddingRight: `${navOnTop ? 0 : ''}`,
        overflow: 'hidden',
        padding: '0 21px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <ArrowNavPair />
        <Box
          sx={{
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              overflowY: 'hidden',
              overflowX: 'auto',
              flexGrow: 1,
              position: 'relative',
              height: '100%',
              marginBottom: '-20px',
              paddingBottom: '20px',
              zIndex: 1,
            }}
          >
            {Children.map(children, (child, index) =>
              cloneElement(child, {
                key: index,
                expanded,
                setExpand: toggleExpansion,
              })
            )?.map(wrapCard)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function ArrowNavPair({ isHidden, onLeftClick, onRightClick }: any) {
  const baseArrowStyle = {
    cursor: 'pointer',
    padding: 0,
    outline: 'none',
    transition: 'opacity .2s ease-in-out',
    position: 'absolute',
    top: '50%',
    margin: '-12px',
    display: isHidden ? 'none' : 'block',
    zIndex: 3,
    border: '1px solid black',
  };

  const leftArrowStyle = {
    ...baseArrowStyle,
    left: 0,
  };

  const rightArrowStyle = {
    ...baseArrowStyle,
    right: 0,
  };

  const buttonStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px 0 #cdced9',
    border: 'solid 1px #ececec',
    padding: '2px',
  };

  const handleMouseOver = (e: any) => {
    e.target.style.backgroundColor = '#f0f0f0';
  };

  const handleMouseOut = (e: any) => {
    e.target.style.backgroundColor = 'white';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        position: 'absolute',
        zIndex: 2,
        width: '100%',
      }}
    >
      <ArrowBack
        sx={{
          ...leftArrowStyle,
          '& .MuiSvgIcon-root': buttonStyle,
        }}
        onClick={onLeftClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <ArrowForward
        sx={{
          ...rightArrowStyle,
          '& .MuiSvgIcon-root': buttonStyle,
        }}
        onClick={onRightClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
}

export default Carousel;
