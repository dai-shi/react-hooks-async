import { useEffect } from 'react';
import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one';

import { useAsyncTask } from './use-async-task';
import { useMemoList } from './utils';

export const useAsyncCombineSeq = (...asyncTasks) => {
  const memoAsyncTasks = useMemoList(asyncTasks, (a, b) => a.start === b.start);
  const task = useAsyncTask(useCallback(
    async (abortController) => {
      abortController.signal.addEventListener('abort', () => {
        memoAsyncTasks.forEach((asyncTask) => {
          asyncTask.abort();
        });
      });
      // start the first one
      memoAsyncTasks[0].start();
    },
    [memoAsyncTasks],
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
