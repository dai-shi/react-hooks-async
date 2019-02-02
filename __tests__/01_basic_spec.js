import React from 'react';
import {
  render,
  flushEffects,
  cleanup,
} from 'react-testing-library';

import { useAsyncTask, useAsyncTaskTimeout, useAsyncRun } from '../src/index';

jest.useFakeTimers();

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(useAsyncTask).toBeDefined();
  });

  it.skip('should create a component with timeout', () => {
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
      if (error) return <div>Error:{error.message}</div>;
      if (pending) return <Waiting abort={abort} />;
      return <div>Result:{result}</div>;
    };
    const App = () => (
      <div>
        <DelayedMessage delay={3000} />
        <DelayedMessage delay={1000} />
      </div>
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    jest.advanceTimersByTime(1000);
    flushEffects();
    expect(container).toMatchSnapshot();
    jest.advanceTimersByTime(2000);
    flushEffects();
    expect(container).toMatchSnapshot();
  });
});
