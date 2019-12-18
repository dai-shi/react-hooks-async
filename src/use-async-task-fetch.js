import { useCallback } from 'react';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const defaultInit = {};
const defaultReadBody = (body) => body.json();

const createFetchError = (message, responseBody) => {
  const err = new Error(message);
  err.name = 'FetchError';
  err.responseBody = responseBody;
  return err;
};

const safeReadBody = async (readBody, response) => {
  try {
    return await readBody(response);
  } catch (e) {
    return null;
  }
};

export const useAsyncTaskFetch = (
  input,
  init = defaultInit,
  argReadBody,
) => {
  // a workaround for terser (#19)
  const readBody = argReadBody || defaultReadBody;
  return useAsyncTask(useCallback(
    async (abortController, inputOverride, initOverride) => {
      const response = await fetch(inputOverride || input, {
        ...init,
        ...initOverride,
        signal: abortController.signal,
      });
      if (!response.ok) {
        const responseBody = await safeReadBody(readBody, response);
        throw createFetchError(response.statusText, responseBody);
      }
      const body = await readBody(response);
      return body;
    },
    [input, init, readBody],
  ));
};

export const useFetch = (...args) => {
  const asyncTask = useAsyncTaskFetch(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
