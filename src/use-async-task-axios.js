import axios from 'axios';
import { useAsyncTask } from './use-async-task';

export const useAsyncTaskAxios = config => useAsyncTask(
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
  [config],
);

export default useAsyncTaskAxios;
