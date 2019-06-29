import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const defaultInit = {};
const defaultReadBody = body => body.json();

const createFetchError = (message) => {
  const err = new Error(message);
  err.name = 'FetchError';
  return err;
};

export const useAsyncTaskFetch = (
  input,
  init = defaultInit,
  readBody = defaultReadBody,
) => useAsyncTask(useCallback(
  async (abortController) => {
    const response = await fetch(input, {
      signal: abortController.signal,
      ...init,
    });
    if (!response.ok) {
      throw createFetchError(response.statusText);
    }
    const body = await readBody(response);
    return body;
  },
  [input, init, readBody],
));

export const useFetch = (...args) => {
  const asyncTask = useAsyncTaskFetch(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
