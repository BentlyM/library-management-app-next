'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-mui';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Toggle visibility once component has mounted
  useEffect(() => {
    setOpen(true);
  }, []);

  // Return a placeholder if it's not mounted yet
  if (!open) {
    return (
      <div
        style={{
          minHeight: '162.37px', // Adjust height if needed
        }}
      ></div>
    );
  }

  // Function to toggle theme
  const handleToggle = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
    </div>
  );
};

export default ThemeToggle;
