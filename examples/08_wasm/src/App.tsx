import * as React from 'react';

import CalcFib from './CalcFib';

const {
  useState,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => {
  const [count, setCount] = useState(1);
  return (
    <ConcurrentMode>
      <div>
        count:{count}
        <button type="button" onClick={() => setCount(count + 1)}>+1</button>
        <button type="button" onClick={() => setCount(count - 1)}>-1</button>
        <CalcFib count={count} />
      </div>
    </ConcurrentMode>
  );
};

export default App;
