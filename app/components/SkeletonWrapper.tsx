import React from 'react';
import { Skeleton } from '@mui/material'; 

const SkeletonWrapper = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}) => {
  if (!isLoading) return children;

  return (
    <Skeleton style={{width: '100%', height: 'fit-content'}} animation="wave">
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;