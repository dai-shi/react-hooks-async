import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { useState } = React;

const App = () => {
  const [id, setId] = useState(1);
  return (
    <div>
      id:
      {id}
      <button onClick={() => setId(id + 1)}>Next</button>
      <button onClick={() => setId(id - 1)}>Previous</button>
      <DisplayRemoteData id={String(id)} />
    </div>
  );
};

export default App;
