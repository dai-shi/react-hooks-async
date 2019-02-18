import * as React from 'react';

import GitHubSearch from './GitHubSearch';

const {
  useState,
  StrictMode,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => {
  const [query, setQuery] = useState('');
  return (
    <StrictMode>
      <ConcurrentMode>
        <div>
          Query:
          <input value={query} onChange={e => setQuery(e.target.value)} />
          {query && <GitHubSearch query={query} />}
        </div>
      </ConcurrentMode>
    </StrictMode>
  );
};

export default App;
