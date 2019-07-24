import { useEffect } from 'react';
import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineSeq = (...asyncTasks) => {
  const task = useAsyncTask(useCallback(
    async (abortController) => {
      abortController.signal.addEventListener('abort', () => {
        asyncTasks.forEach((asyncTask) => {
          asyncTask.abort();
        });
      });
      // start the first one
      asyncTasks[0].start();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    asyncTasks.map(({ start }) => start),
  ));
  useEffect(() => {
    // if prev task is finished, start next task
    const index = asyncTasks.findIndex(({ started }) => !started);
    const prevTask = asyncTasks[index - 1];
    const nextTask = asyncTasks[index];
    if (nextTask && prevTask && !prevTask.pending && !prevTask.error) {
      nextTask.start();
    }
  });
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};
