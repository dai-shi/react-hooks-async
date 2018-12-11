import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

import { useAsyncRun, useAsyncTaskTimeout } from 'react-hooks-async';

const Err = ({ error }) => (
  <div>
    Error:
    {error.message}
  </div>
);

const Waiting = ({ abort }) => (
  <div>
    Waiting...
    <button type="button" onClick={abort}>Abort</button>
  </div>
);

const DelayedMessage = ({ delay }) => {
  const func = useCallback(() => <h1>Hi</h1>, []);
  const asyncTask = useAsyncTaskTimeout(func, delay);
  useAsyncRun(asyncTask);
  const {
    pending,
    error,
    result,
    abort,
  } = asyncTask;
  if (error) return <Err error={error} />;
  if (pending) return <Waiting abort={abort} />;
  return (
    <div>
      Result:
      {result}
    </div>
  );
};

const App = () => (
  <div>
    <DelayedMessage delay={3000} />
    <DelayedMessage delay={1000} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
