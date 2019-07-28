import { useEffect } from 'react';
import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one';

import { useAsyncTask } from './use-async-task';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMemoList = items => useMemo(() => items, items);

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
