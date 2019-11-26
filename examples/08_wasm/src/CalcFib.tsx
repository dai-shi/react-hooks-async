import React from 'react';

import { useWasm } from 'react-hooks-async';

type Result = {
  exports: {
    fib: (x: number) => number;
  };
};

const Err: React.SFC<{ error: Error }> = ({ error }) => (
  <div>Error: {error.name} {error.message}</div>
);

const Loading: React.SFC<{ abort: () => void }> = ({ abort }) => (
  <div>
    Loading...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

const CalcFib: React.FC<{ count: number }> = ({ count }) => {
  const asyncTask = useWasm<Result>('./slow_fib.wasm');
  if (asyncTask.aborted) return <Err error={new Error('Aborted')} />;
  if (asyncTask.error) return <Err error={asyncTask.error} />;
  if (asyncTask.pending) return <Loading abort={asyncTask.abort} />;
  return <div>Fib: {asyncTask.result.exports.fib(count)}</div>;
};

export default CalcFib;
