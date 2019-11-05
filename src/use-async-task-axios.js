import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

export const useAsyncTaskAxios = (axios, config) => useAsyncTask(useCallback(
  async (abortController, configOverride) => {
    const source = axios.CancelToken.source();
    abortController.signal.addEventListener('abort', () => {
      source.cancel('canceled');
    });
    try {
      return await axios({
        ...config,
        ...configOverride,
        cancelToken: source.token,
      });
    } catch (e) {
      if (axios.isCancel(e)) {
        const error = new Error(e.message);
        error.name = 'AbortError';
        throw error;
      }
      throw e;
    }
  },
  [axios, config],
));

export const useAxios = (...args) => {
  const asyncTask = useAsyncTaskAxios(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
