import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { useAsyncRun, useAsyncTaskTimeout } from 'react-hooks-async';

const Err = ({ error }) => (
  <div>Error: {error.message}</div>
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
  return <div>Result: {result}</div>;
};

const App = () => (
  <StrictMode>
    <div>
      <DelayedMessage delay={3000} />
      <DelayedMessage delay={1000} />
    </div>
  </StrictMode>
);

ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);
