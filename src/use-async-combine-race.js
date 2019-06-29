import { useEffect, useRef } from 'react';
import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineRace = (...asyncTasks) => {
  const callback = useRef(null);
  useEffect(() => {
    if (callback.current) {
      callback.current(asyncTasks);
    }
  });
  const task = useAsyncTask(useCallback(
    async (abortController) => {
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
    },
    // TODO Do we have a better way?
    // eslint-disable-next-line react-hooks/exhaustive-deps
    asyncTasks.map(({ start }) => start),
  ));
  useEffect(() => {
    const cleanup = () => {
      callback.current = null;
    };
    return cleanup;
  }, asyncTasks.map(({ start }) => start)); // eslint-disable-line react-hooks/exhaustive-deps
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};
