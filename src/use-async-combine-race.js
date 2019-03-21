import { useEffect, useRef } from 'react';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineRace = (...asyncTasks) => {
  const callback = useRef(null);
  useEffect(() => {
    if (callback.current) {
      callback.current(asyncTasks);
    }
  });
  const task = useAsyncTask(async (abortController) => {
    abortController.signal.addEventListener('abort', () => {
      asyncTasks.forEach((asyncTask) => {
        if (asyncTask.abort) {
          asyncTask.abort();
        }
      });
    });
    const stopOthers = (tasks) => {
      const index = tasks.findIndex(({ pending }) => !pending);
      if (index >= 0) {
        tasks.forEach((asyncTask, i) => {
          if (i !== index && asyncTask.abort) {
            asyncTask.abort();
          }
        });
      }
    };
    callback.current = stopOthers;
    asyncTasks.forEach((asyncTask) => {
      if (!asyncTask.start) throw new Error('no asyncTask.start');
      asyncTask.start();
    });
  }, asyncTasks.map(({ start }) => start));
  useEffect(() => {
    const cleanup = () => {
      callback.current = null;
    };
    return cleanup;
  }, asyncTasks.map(({ start }) => start));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};

export default useAsyncCombineRace;
