import { useAsyncTask } from './use-async-task';

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
) => useAsyncTask(
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
);

export default useAsyncTaskFetch;
