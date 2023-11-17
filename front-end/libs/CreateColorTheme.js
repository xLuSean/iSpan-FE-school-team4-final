import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function createColorTheme(color) {
  return function CustomTheme({ children }) {
    return (
      <ThemeProvider
        theme={(theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              primary: {
                main: color,
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
