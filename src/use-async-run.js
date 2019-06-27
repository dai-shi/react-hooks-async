import { useEffect } from 'react';

export const useAsyncRun = (asyncTask) => {
  const start = asyncTask && asyncTask.start;
  const abort = asyncTask && asyncTask.abort;
  useEffect(() => {
    if (start) {
      start();
    }
  }, [start]);
  useEffect(() => {
    const cleanup = () => {
      if (abort) {
        abort();
      }
    };
    return cleanup;
  }, [abort]);
};
