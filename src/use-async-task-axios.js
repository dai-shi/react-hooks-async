import { useRef } from 'react';
import axios from 'axios';
import { useAsyncTask } from './use-async-task';

// this can be too naive
export const useMemoSafe = (create, inputs) => {
  const memoized = useRef();
  const prevInputs = useRef([]);
  if (prevInputs.current.length !== inputs.length
    || prevInputs.current.some((x, i) => x !== inputs[i])) {
    prevInputs.current = inputs;
    memoized.current = create();
  }
  return memoized.current;
};

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
