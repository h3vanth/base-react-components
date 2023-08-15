import * as React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <MuiThemeProvider theme={darkTheme}>{props.children}</MuiThemeProvider>
  );
};

export default ThemeProvider;
