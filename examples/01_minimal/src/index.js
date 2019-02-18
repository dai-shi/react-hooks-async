import React, { StrictMode, unstable_ConcurrentMode as ConcurrentMode } from 'react';
import ReactDOM from 'react-dom';

import { useAsyncRun } from 'react-hooks-async';
import { useAsyncTaskTimeout } from 'react-hooks-async/src/use-async-task-timeout';

const Err = ({ error }) => (
  <div>Error:{error.message}</div>
);

const Waiting = ({ abort }) => (
  <div>
    Waiting...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

const renderHi = () => <h1>Hi</h1>;

const DelayedMessage = ({ delay }) => {
  const asyncTask = useAsyncTaskTimeout(renderHi, delay);
  useAsyncRun(asyncTask);
  const {
    pending,
    error,
    result,
    abort,
  } = asyncTask;
  if (error) return <Err error={error} />;
  if (pending) return <Waiting abort={abort} />;
  return <div>Result:{result}</div>;
};

const App = () => (
  <StrictMode>
    <ConcurrentMode>
      <div>
        <DelayedMessage delay={3000} />
        <DelayedMessage delay={1000} />
      </div>
    </ConcurrentMode>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById('app'));
