import {
  useCallbackOne as useCallback,
  useMemoOne as useMemo,
} from 'use-memo-one';

import { useAsyncTask } from './use-async-task';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMemoList = items => useMemo(() => items, items);

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
