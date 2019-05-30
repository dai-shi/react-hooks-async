import * as React from 'react';
import { useState, StrictMode } from 'react';

import DisplayRemoteData from './DisplayRemoteData';
import UserInfo from './UserInfo';

const App = () => {
  const [id, setId] = useState('1');
  const [id2, setId2] = useState('1');
  return (
    <StrictMode>
      <div>
        <div>
          id:
          <input value={id} onChange={e => setId(e.target.value)} />
          {id && <DisplayRemoteData id={id} />}
        </div>
        <hr />
        <div>
          id:
          <input value={id2} onChange={e => setId2(e.target.value)} />
          {id2 && <UserInfo id={id2} />}
        </div>
      </div>
    </StrictMode>
  );
};

export default App;
