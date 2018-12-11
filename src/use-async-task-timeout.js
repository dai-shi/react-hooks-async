import { useAsyncTask } from './use-async-task';

const createAbortError = (message) => {
  try {
    return new DOMException(message, 'AbortError');
  } catch (e) {
    const err = new Error(message);
    err.name = 'AbortError';
    return err;
  }
};

export const useAsyncTaskTimeout = (func, delay) => useAsyncTask(
  abortController => new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      resolve(func());
    }, delay);
    abortController.signal.addEventListener('abort', () => {
      clearTimeout(id);
      reject(createAbortError('timer aborted'));
    });
  }),
  [func, delay],
);

export default useAsyncTaskTimeout;
