import React from 'react';

import ExchangeRate from './ExchangeRate';
import { StoreProvider } from '../store';


function App() {

  return (
    <StoreProvider>
      <ExchangeRate />
    </StoreProvider>
  );
}

export default App;
