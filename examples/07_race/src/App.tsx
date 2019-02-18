import * as React from 'react';

import DelayedData from './DelayedData';

const {
  StrictMode,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => (
  <StrictMode>
    <ConcurrentMode>
      <div>
        <DelayedData />
      </div>
    </ConcurrentMode>
  </StrictMode>
);

export default App;
