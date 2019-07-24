import { useEffect } from 'react';

export const useAsyncRun = (asyncTask, ...args) => {
  const { start, abort } = asyncTask;
  useEffect(() => {
    start(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncTask.start, ...args]);
  useEffect(() => {
    const cleanup = () => {
      abort();
    };
    return cleanup;
  }, [abort]);
};
