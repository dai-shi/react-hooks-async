import { useEffect, useRef } from 'react';

export const useAsyncRun = (asyncTask) => {
  const previous = useRef(null);
  useEffect(() => {
    if (asyncTask) {
      if (previous.current) {
        previous.current.abort();
      }
      previous.current = asyncTask;
      asyncTask.start();
    }
  }, [asyncTask && asyncTask.taskId]);
};

export default useAsyncRun;
