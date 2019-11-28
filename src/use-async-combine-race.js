import { useCallback, useEffect, useMemo } from 'react';

import { useAsyncTask } from './use-async-task';
import { useMemoList } from './utils';

export const useAsyncCombineRace = (...asyncTasks) => {
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
  const finishedIndex = asyncTasks.findIndex(({ pending }) => !pending);
  useEffect(() => {
    // if there's one task finished, abort all the others
    if (finishedIndex >= 0) {
      asyncTasks.forEach((asyncTask, i) => {
        if (i !== finishedIndex) {
          asyncTask.abort();
        }
      });
    }
  });
  const taskAborted = asyncTasks.every(({ aborted }) => aborted);
  const taskPending = asyncTasks.every(({ pending }) => pending);
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
