import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { useState } = React;

const App = () => {
  const [id, setId] = useState(1);
  return (
    <React.StrictMode>
      <div>
        id:{id}
        <button type="button" onClick={() => setId(id + 1)}>Next</button>
        <button type="button" onClick={() => setId(id - 1)}>Previous</button>
        <DisplayRemoteData id={String(id)} />
      </div>
    </React.StrictMode>
  );
};

export default App;
