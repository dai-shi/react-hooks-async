import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

export const useAsyncTaskAxios = (axios, config, deps) => useAsyncTask(
  (abortController) => {
    const source = axios.CancelToken.source();
    abortController.signal.addEventListener('abort', () => {
      source.cancel('canceled');
    });
    return axios({
      ...config,
      cancelToken: source.token,
    });
  },
  deps,
);

export const useAxios = (...args) => {
  const asyncTask = useAsyncTaskAxios(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
