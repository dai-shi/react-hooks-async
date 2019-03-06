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

export const useAsyncTaskDelay = (milliSeconds, deps) => useAsyncTask(
  abortController => new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      resolve(true);
    }, milliSeconds);
    abortController.signal.addEventListener('abort', () => {
      clearTimeout(id);
      reject(createAbortError('timer aborted'));
    });
  }),
  deps,
);

export default useAsyncTaskDelay;
