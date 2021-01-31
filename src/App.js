import React from 'react';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { Navbar, Products } from './components';

const App = () => {
  return (
    <ScopedCssBaseline>
      <Navbar />
      <Products />
    </ScopedCssBaseline>
  );
};

export default App;
