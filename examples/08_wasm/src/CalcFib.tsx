import * as React from 'react';

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
  const {
    pending,
    error,
    result,
    abort,
  } = asyncTask;
  if (error) return <Err error={error} />;
  if (pending) return <Loading abort={abort} />;
  if (!result) return <div>No result</div>;
  return <div>Fib: {result.exports.fib(count)}</div>;
};

export default CalcFib;
