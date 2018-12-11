import { useAsyncTask } from './use-async-task';

export const useAsyncCombineAll = (asyncTasks) => {
  const task = useAsyncTask(async (abortController) => {
    abortController.signal.addEventListener('abort', () => {
      asyncTasks.forEach((asyncTask) => {
        asyncTask.abort();
      });
    });
    asyncTasks.forEach((asyncTask) => {
      asyncTask.start();
    });
  }, asyncTasks.map(({ taskId }) => taskId));
  return {
    ...task,
    pending: asyncTasks.some(({ pending }) => pending),
    error: asyncTasks.map(({ error }) => error),
    result: asyncTasks.map(({ result }) => result),
  };
};

export default useAsyncCombineAll;
