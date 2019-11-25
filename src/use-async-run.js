import { useEffect } from 'react';

import { useMemoList } from './utils';

export const useAsyncRun = (asyncTask, ...args) => {
  const start = asyncTask && asyncTask.start;
  const started = asyncTask && asyncTask.started;
  const abort = asyncTask && asyncTask.abort;
  const memoArgs = useMemoList(args);
  useEffect(() => {
    if (start) {
      start(...memoArgs);
    }
  }, [start, memoArgs]);
  useEffect(() => {
    const cleanup = () => {
      if (started && abort) {
        abort();
      }
    };
    return cleanup;
  }, [started, abort]);
};
