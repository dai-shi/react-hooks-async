import * as React from 'react';

import DelayedData from './DelayedData';

const {
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => (
  <ConcurrentMode>
    <div>
      <DelayedData />
    </div>
  </ConcurrentMode>
);

export default App;
