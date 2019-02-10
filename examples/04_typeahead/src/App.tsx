import * as React from 'react';

import GitHubSearch from './GitHubSearch';

const { useState } = React;

const App = () => {
  const [query, setQuery] = useState('');
  return (
    <React.StrictMode>
      <div>
        Query:
        <input value={query} onChange={e => setQuery(e.target.value)} />
        {query && <GitHubSearch query={query} />}
      </div>
    </React.StrictMode>
  );
};

export default App;
