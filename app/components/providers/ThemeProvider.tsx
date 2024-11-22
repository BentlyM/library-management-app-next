import { GlobalStyles } from '@mui/material';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, globalStyles, lightTheme } from '../../lib/theme';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme); // Default to dark theme

  useEffect(() => {
    if (resolvedTheme === 'light') {
      setCurrentTheme(lightTheme);
    } else {
      setCurrentTheme(darkTheme);
    }
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
