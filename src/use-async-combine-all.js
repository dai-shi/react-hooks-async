import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineAll = (...asyncTasks) => {
  const task = useAsyncTask(useCallback(
    async (abortController) => {
      abortController.signal.addEventListener('abort', () => {
        asyncTasks.forEach((asyncTask) => {
          asyncTask.abort();
        });
      });
      // start everything
      asyncTasks.forEach((asyncTask) => {
        asyncTask.start();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    asyncTasks.map(({ start }) => start),
  ));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};
