import React, { useState } from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const App = () => {
  const [id, setId] = useState(1);
  return (
    <div>
      id: {id}
      <button type="button" onClick={() => setId(id + 1)}>Next</button>
      <button type="button" onClick={() => setId(id - 1)}>Previous</button>
      <DisplayRemoteData id={String(id)} />
    </div>
  );
};

export default App;
