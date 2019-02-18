import * as React from 'react';

import CalcFib from './CalcFib';

const {
  useState,
  StrictMode,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => {
  const [count, setCount] = useState(1);
  return (
    <StrictMode>
      <ConcurrentMode>
        <div>
          count:{count}
          <button type="button" onClick={() => setCount(count + 1)}>+1</button>
          <button type="button" onClick={() => setCount(count - 1)}>-1</button>
          <CalcFib count={count} />
        </div>
      </ConcurrentMode>
    </StrictMode>
  );
};

export default App;
