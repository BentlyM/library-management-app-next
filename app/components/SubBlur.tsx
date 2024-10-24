import Link from 'next/link';
import React from 'react';

export const SubBlur = ({
  children,
  link,
}: {
  children: string;
  link: string;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      <Link
        href={link || ''}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        {children}
      </Link>
    </div>
  );
};

export default SubBlur;
