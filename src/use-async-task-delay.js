import { useCallback } from 'react';

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

export const useAsyncTaskDelay = (delay) => useAsyncTask(useCallback(
  (abortController, delayOverride) => new Promise((resolve, reject) => {
    const delayToUse = delayOverride || delay;
    const id = setTimeout(() => {
      resolve(true);
    }, typeof delayToUse === 'function' ? delayToUse() : delayToUse);
    abortController.signal.addEventListener('abort', () => {
      clearTimeout(id);
      reject(createAbortError('timer aborted'));
    });
  }),
  [delay],
));
