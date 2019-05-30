import * as React from 'react';
import { StrictMode } from 'react';

import DelayedData from './DelayedData';

const App = () => (
  <StrictMode>
    <div>
      <DelayedData />
    </div>
  </StrictMode>
);

export default App;
