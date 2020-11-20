import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Root from './components/Root';
import Header from './components/Header';

const App = () => {
  return (
    <ThemeProvider theme = {theme}>
    <div>
      <CssBaseline />
      <Header />
      <Root />
    </div>
    </ThemeProvider>
  );
}

export default App;
