import React from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC4747",
    },
  },
  overrides: {},
});

export default theme;

const ThemeProvider = (props) => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);

export { ThemeProvider };
