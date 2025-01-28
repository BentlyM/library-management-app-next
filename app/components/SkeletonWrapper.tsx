import React from 'react';
import { Skeleton, SkeletonProps } from '@mui/material';

interface SkeletonWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  width?: number | string;
  height?: number | string;
  variant?: SkeletonProps['variant'];
  animation?: SkeletonProps['animation'];
}

const SkeletonWrapper = ({
  children,
  isLoading,
  width = '100%',
  height = 'fit-content',
  variant = 'rectangular',
  animation = 'wave',
}: SkeletonWrapperProps) => {
  if (!isLoading) return <>{children}</>;

  return (
    <Skeleton
      width={width}
      height={height}
      variant={variant}
      animation={animation}
    >
      <div style={{ opacity: 0 }}>{children}</div>
    </Skeleton>
  );
};

export default SkeletonWrapper;
