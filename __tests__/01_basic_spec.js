import React, { StrictMode } from 'react';
import { render, cleanup } from '@testing-library/react';

import { useAsyncTask, useAsyncRun, useAsyncTaskTimeout } from '../src/index';

// FIXME we should fake timers
// jest.useFakeTimers();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(useAsyncTask).toBeDefined();
  });

  it('should create a component with timeout', async () => {
    const Waiting = ({ abort }) => (
      <div>
        Waiting...
        <button type="button" onClick={abort}>Abort</button>
      </div>
    );
    const renderHi = () => <h1>Hi</h1>;
    const DelayedMessage = ({ delay }) => {
      const asyncTask = useAsyncTaskTimeout(renderHi, delay, [renderHi, delay]);
      useAsyncRun(asyncTask);
      const {
        pending,
        error,
        result,
        abort,
      } = asyncTask;
      if (error) return <div>Error:{error.message}</div>;
      if (pending) return <Waiting abort={abort} />;
      return <div>Result:{result}</div>;
    };
    const App = () => (
      <StrictMode>
        <div>
          <DelayedMessage delay={300} />
          <DelayedMessage delay={100} />
        </div>
      </StrictMode>
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    // jest.advanceTimersByTime(100);
    await sleep(100);
    expect(container).toMatchSnapshot();
    // jest.advanceTimersByTime(200);
    await sleep(200);
    expect(container).toMatchSnapshot();
  });
});
