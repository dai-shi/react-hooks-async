import { useAsyncTask } from './use-async-task';

export const useAsyncCombineAll = (...asyncTasks) => {
  const task = useAsyncTask(async (abortController) => {
    abortController.signal.addEventListener('abort', () => {
      asyncTasks.forEach((asyncTask) => {
        if (asyncTask.abort) {
          asyncTask.abort();
        }
      });
    });
    asyncTasks.forEach((asyncTask) => {
      if (!asyncTask.start) throw new Error('no asyncTask.start');
      asyncTask.start();
    });
  }, asyncTasks.map(({ start }) => start));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.find(({ error }) => error),
    errorAll: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};

export default useAsyncCombineAll;
