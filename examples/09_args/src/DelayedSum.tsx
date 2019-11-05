import React, { useState } from 'react';

import { useAsyncTask, useAsyncRun } from 'react-hooks-async';

const func = async (_abortController: unknown, ...args: number[]) => {
  const sum = args.reduce((a, b) => a + b);
  return sum;
};

const DelayedSum: React.FC = () => {
  const [ready, setReady] = useState(false);
  const [nums, setNums] = useState('1, 2, 3');
  const args = nums.split(',').map(x => Number(x));
  const asyncTask = useAsyncTask(func);
  useAsyncRun(ready && asyncTask, ...args);
  return (
    <div>
      <div>
        Args: <input value={nums} onChange={e => setNums(e.target.value)} />
      </div>
      <div>
        <input type="checkbox" onClick={() => setReady(!ready)} />
        Run automatically
      </div>
      <div>
        <button type="button" onClick={() => asyncTask.start(...args)}>
          Run manually
        </button>
      </div>
      <div>
        Result: {asyncTask.result}
      </div>
    </div>
  );
};

export default DelayedSum;
