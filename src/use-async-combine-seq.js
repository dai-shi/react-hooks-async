import { useEffect, useRef } from 'react';

import { useAsyncTask } from './use-async-task';

export const useAsyncCombineSeq = (...asyncTasks) => {
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
    const startNext = (tasks) => {
      const index = tasks.findIndex(({ started }) => !started);
      const prevTask = tasks[index - 1];
      const nextTask = tasks[index];
      if (nextTask && prevTask && !prevTask.pending && !prevTask.error) {
        if (!nextTask.start) throw new Error('no asyncTask.start');
        nextTask.start();
      }
    };
    callback.current = startNext;
    if (!asyncTasks[0].start) throw new Error('no asyncTask.start');
    asyncTasks[0].start();
  }, asyncTasks.map(({ start }) => start));
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

export default useAsyncCombineSeq;
