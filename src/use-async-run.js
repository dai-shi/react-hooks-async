import { useEffect, useRef } from 'react';

import { useMemoList } from './utils';

export const useAsyncRun = (asyncTask, ...args) => {
  const start = asyncTask && asyncTask.start;
  const memoArgs = useMemoList(args);
  const abort = asyncTask && asyncTask.abort;
  const lastAbort = useRef(null);
  useEffect(() => {
    if (start) {
      if (lastAbort.current) {
        lastAbort.current();
      }
      (async () => {
        try {
          await start(...memoArgs);
        } catch (e) {
          // we ignore this error because it's handled with state
        }
      })();
    }
  }, [start, memoArgs]);
  useEffect(() => {
    if (abort) {
      lastAbort.current = abort;
    }
  }, [abort]);
  useEffect(() => {
    const cleanup = () => {
      if (lastAbort.current) {
        lastAbort.current();
      }
    };
    return cleanup;
  }, []);
};
