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
    <Skeleton style={{width: '100%'}} animation="wave">
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;