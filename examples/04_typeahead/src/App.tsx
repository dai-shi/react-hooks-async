import * as React from 'react';

import GitHubSearch from './GitHubSearch';

const {
  useState,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => {
  const [query, setQuery] = useState('');
  return (
    <ConcurrentMode>
      <div>
        Query:
        <input value={query} onChange={e => setQuery(e.target.value)} />
        {query && <GitHubSearch query={query} />}
      </div>
    </ConcurrentMode>
  );
};

export default App;
