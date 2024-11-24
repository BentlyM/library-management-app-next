'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-mui';
import { useColorScheme } from '@mui/material/styles';

const ThemeToggle: React.FC = () => {
  const { mode, systemMode, setMode } = useColorScheme();

  const toggleDarkTheme = React.useCallback(() => {
    if (mode) {
      const currMode =
        mode === 'dark'
          ? 'light'
          : mode === 'light'
          ? 'dark'
          : (localStorage.getItem('mui-mode') as 'light' | 'dark');
      setMode(currMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, systemMode]);

  return (
    <div
      onClick={toggleDarkTheme}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {mode === 'dark' ? <Sun /> : <Moon />}
    </div>
  );
};

export default ThemeToggle;
