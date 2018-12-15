import { useRef } from 'react';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineSeq = (...asyncTasks) => {
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
    const startNext = (tasks) => {
      const index = tasks.findIndex(({ started }) => !started);
      const prevTask = tasks[index - 1];
      const nextTask = tasks[index];
      if (nextTask && prevTask && !prevTask.pending && !prevTask.error) {
        nextTask.start();
      }
    };
    callback.current = startNext;
    asyncTasks[0].start();
  }, asyncTasks.map(({ taskId }) => taskId));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};

export default useAsyncCombineSeq;
