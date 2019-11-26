import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import { useAsyncTask } from './use-async-task';
import { useMemoList } from './utils';

export const useAsyncCombineSeq = (...asyncTasks) => {
  const indexRef = useRef(0);
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
      indexRef.current = 0;
    },
    [memoAsyncTasks],
  ));
  useEffect(() => {
    // if current task is finished, start next task
    const currTask = asyncTasks[indexRef.current];
    const nextTask = asyncTasks[indexRef.current + 1];
    if (nextTask && currTask && !currTask.pending && !currTask.error) {
      nextTask.start();
      indexRef.current += 1;
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
