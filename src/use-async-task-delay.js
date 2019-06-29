import { useCallbackOne as useCallback } from 'use-memo-one';

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

export const useAsyncTaskDelay = delay => useAsyncTask(useCallback(
  abortController => new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      resolve(true);
    }, typeof delay === 'function' ? delay() : delay);
    abortController.signal.addEventListener('abort', () => {
      clearTimeout(id);
      reject(createAbortError('timer aborted'));
    });
  }),
  [delay],
));
