import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function createBreakPointTheme(value) {
  return function CustomTheme({ children }) {
    return (
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            breakpoints: {
              values: {
                ...theme.breakpoints.values,
                ...value,
              },
            },
          })
        }
      >
        {children}
      </ThemeProvider>
    );
  };
}
