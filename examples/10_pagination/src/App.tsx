import React from 'react';

import PagedList from './PagedList';
import ContinuedList from './ContinuedList';

const App = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div>
      <h1>Paged List</h1>
      <PagedList />
    </div>
    <div>
      <h1>Continued List</h1>
      <ContinuedList />
    </div>
  </div>
);

export default App;
