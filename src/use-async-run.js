import { useEffect } from 'react';

export const useAsyncRun = (asyncTask, ...args) => {
  const start = asyncTask && asyncTask.start;
  const abort = asyncTask && asyncTask.abort;
  useEffect(() => {
    if (start) {
      start(...args);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, ...args]);
  useEffect(() => {
    const cleanup = () => {
      if (abort) {
        abort();
      }
    };
    return cleanup;
  }, [abort]);
};
