import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export default function MUIProvider({ children }: { children: React.ReactNode }) {
  const theme = useMemo(
    () => createTheme({
      colorSchemes: { light: true, dark: true },
      cssVariables: {
        colorSchemeSelector: 'data'
      }
    }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}