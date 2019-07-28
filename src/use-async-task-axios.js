import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

export const useAsyncTaskAxios = (axios, config) => useAsyncTask(useCallback(
  (abortController, configOverride) => {
    const source = axios.CancelToken.source();
    abortController.signal.addEventListener('abort', () => {
      source.cancel('canceled');
    });
    return axios({
      ...config,
      ...configOverride,
      cancelToken: source.token,
    });
  },
  [axios, config],
));

export const useAxios = (...args) => {
  const asyncTask = useAsyncTaskAxios(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
