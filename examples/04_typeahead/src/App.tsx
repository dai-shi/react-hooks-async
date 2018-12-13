import * as React from 'react';

import GitHubSearch from './GitHubSearch';

const { useState } = React;

const App = () => {
  const [query, setQuery] = useState('');
  return (
    <div>
      Query:
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {query && <GitHubSearch query={query} />}
    </div>
  );
};

export default App;
