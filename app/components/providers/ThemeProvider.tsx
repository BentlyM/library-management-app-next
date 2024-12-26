'use client'
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { useContext, createContext, useMemo, ReactNode } from "react";
import type {} from '@mui/material/themeCssVarsAugmentation';

const AppThemeContext = createContext(null)

interface AppThemeProviderProps {
  children: ReactNode;
}

const AppThemeProvider = (props: AppThemeProviderProps) => {

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme({
            cssVariables: {
                colorSchemeSelector: "class",
                disableCssColorScheme: true
            },
            palette: {
                primary: {
                  main: `#4f46e5`,
                  contrastText: 'rgb(255, 255, 255)',
                },
                secondary: {
                  main: `#818cf8`,
                  contrastText: 'rgb(255, 255, 255)',
                },
              },
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            main: "#4f46e5"
                        },
                        secondary: {
                            main: "#4f46e5"
                        }
                    }
                },
                dark: {
                    palette: {
                      primary: {
                        main: "#818cf8",
                      },
                      secondary: {
                        main: "rgb(27, 59, 111)",
                      },
                    },
                  },
            }
        }))
    },[])

    return <AppThemeContext.Provider value={null}>
        {/* <ThemeProvider defaultMode="system" theme={theme} disableTransitionOnChange> */}
        <ThemeProvider theme={theme} disableTransitionOnChange>
            <CssBaseline enableColorScheme />
            {props.children}
        </ThemeProvider>
    </AppThemeContext.Provider>
}

export const useAppThemeContext = () => useContext(AppThemeContext)

export default AppThemeProvider;
