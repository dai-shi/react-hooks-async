import { useRef } from 'react';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineRace = (...asyncTasks) => {
  const callback = useRef(null);
  if (callback.current) {
    callback.current(asyncTasks);
  }
  const task = useAsyncTask(async (abortController) => {
    abortController.signal.addEventListener('abort', () => {
      asyncTasks.forEach((asyncTask) => {
        asyncTask.abort();
      });
    });
    const stopOthers = (tasks) => {
      const index = tasks.findIndex(({ pending }) => !pending);
      if (index >= 0) {
        tasks.forEach((asyncTask, i) => {
          if (i !== index) {
            asyncTask.abort();
          }
        });
      }
    };
    callback.current = stopOthers;
    asyncTasks.forEach((asyncTask) => {
      asyncTask.start();
    });
  }, asyncTasks.map(({ taskId }) => taskId));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};

export default useAsyncCombineRace;
