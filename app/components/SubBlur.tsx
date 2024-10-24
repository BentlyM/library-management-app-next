import React from 'react';

export const SubBlur = ({ children }: { children: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent overlay
        backdropFilter: 'blur(5px)', // Apply blur effect
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888', // Text color for the overlay
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
      onClick={() => {
        console.log('testing');
      }}
    >
      Subscribe to view this chart
    </div>
  );
};

export default SubBlur;
