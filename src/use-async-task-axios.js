import { useRef } from 'react';
import axios from 'axios';
import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const shallowArrayEqual = (a1, a2) => {
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i += 1) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
};

// this can be too naive
export const useMemoPrev = (create, deps) => {
  const memoized = useRef(null);
  const prevDeps = useRef(null);
  if (!prevDeps.current || !shallowArrayEqual(prevDeps.current, deps)) {
    prevDeps.current = deps;
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

export const useAxios = (...args) => {
  const asyncTask = useAsyncTaskAxios(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};

export default useAsyncTaskAxios;
