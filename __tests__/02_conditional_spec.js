import React, { StrictMode, useState } from 'react';
import {
  render,
  fireEvent,
  wait,
  cleanup,
} from '@testing-library/react';

import { useAsyncTask, useAsyncRun } from '../src/index';

describe('conditional runnning spec', () => {
  afterEach(cleanup);

  it('should run task conditionally', async () => {
    const func = async () => 1234;
    const ChildComponent = ({ ready }) => {
      const asyncTask = useAsyncTask(func);
      useAsyncRun(ready && asyncTask);
      return (
        <div>
          <div>Started: {asyncTask.started ? 'started' : 'init'}</div>
          <div>Pending: {asyncTask.pending ? 'pending' : 'done'}</div>
          <div>Result: {asyncTask.result}</div>
        </div>
      );
    };
    const ParentComponent = () => {
      const [ready, setReady] = useState(false);
      return (
        <div>
          <ChildComponent ready={ready} />
          <button type="button" onClick={() => setReady(true)}>click</button>
        </div>
      );
    };
    const App = () => (
      <StrictMode>
        <ParentComponent />
      </StrictMode>
    );
    const { getByText, container } = render(<App />);
    await wait();
    expect(container).toMatchSnapshot();
    fireEvent.click(getByText('click'));
    await wait();
    expect(container).toMatchSnapshot();
  });
});
