/* eslint no-restricted-syntax: off, no-await-in-loop: off */

import { useCallback, useMemo } from 'react';

import { useAsyncTask, SYMBOL_ABORTED } from './use-async-task';
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
      // start sequentially
      const results = [];
      for (const currentTask of memoAsyncTasks) {
        const result = await currentTask.start();
        results.push(result);
        if (result === SYMBOL_ABORTED) return results;
      }
      return results;
    },
    [memoAsyncTasks],
  ));
  const taskAborted = asyncTasks.some(({ aborted }) => aborted);
  const taskPending = asyncTasks.some(({ pending }) => pending);
  const taskError = asyncTasks.find(({ error }) => error);
  const taskErrorAll = useMemoList(asyncTasks.map(({ error }) => error));
  const taskResult = useMemoList(asyncTasks.map(({ result }) => result));
  return useMemo(() => ({
    start: task.start,
    abort: task.abort,
    started: task.started,
    aborted: taskAborted,
    pending: taskPending,
    error: taskError,
    errorAll: taskErrorAll,
    result: taskPending ? null : taskResult,
  }), [
    task.start,
    task.abort,
    task.started,
    taskAborted,
    taskPending,
    taskError,
    taskErrorAll,
    taskResult,
  ]);
};
