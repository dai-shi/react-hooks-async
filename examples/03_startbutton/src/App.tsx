import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { useState } = React;

const App = () => {
  const [id, setId] = useState('1');
  return (
    <div>
      id:
      <input value={id} onChange={e => setId(e.target.value)} />
      {id && <DisplayRemoteData id={id} />}
    </div>
  );
};

export default App;
