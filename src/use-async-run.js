import { useEffect } from 'react';

export const useAsyncRun = (asyncTask) => {
  useEffect(() => {
    if (asyncTask) {
      asyncTask.start();
    }
    const cleanup = () => {
      if (asyncTask) {
        asyncTask.abort();
      }
    };
    return cleanup;
  }, [asyncTask && asyncTask.taskId]);
};

export default useAsyncRun;
