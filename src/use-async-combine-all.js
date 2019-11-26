import { useCallback, useMemo } from 'react';

import { useAsyncTask } from './use-async-task';
import { useMemoList } from './utils';

export const useAsyncCombineAll = (...asyncTasks) => {
  const memoAsyncTasks = useMemoList(asyncTasks, (a, b) => a.start === b.start);
  const task = useAsyncTask(useCallback(
    async (abortController) => {
      abortController.signal.addEventListener('abort', () => {
        memoAsyncTasks.forEach((asyncTask) => {
          asyncTask.abort();
        });
      });
      // start everything
      memoAsyncTasks.forEach((asyncTask) => {
        asyncTask.start();
      });
    },
    [memoAsyncTasks],
  ));
  const taskPending = asyncTasks.some(({ pending }) => pending);
  const taskError = asyncTasks.find(({ error }) => error);
  const taskErrorAll = useMemoList(asyncTasks.map(({ error }) => error));
  const taskResult = useMemoList(asyncTasks.map(({ result }) => result));
  return useMemo(() => ({
    start: task.start,
    abort: task.abort,
    started: task.started,
    pending: taskPending,
    error: taskError,
    errorAll: taskErrorAll,
    result: taskResult,
  }), [
    task.start,
    task.abort,
    task.started,
    taskPending,
    taskError,
    taskErrorAll,
    taskResult,
  ]);
};
