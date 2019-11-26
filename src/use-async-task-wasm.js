import { useCallback } from 'react';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const defaultImportObject = {};

export const useAsyncTaskWasm = (
  input,
  importObject = defaultImportObject,
) => useAsyncTask(useCallback(
  async (abortController, inputOverride) => {
    const inputToUse = (
      typeof input === 'object' && typeof inputOverride === 'object'
    ) ? { ...input, ...inputOverride } : (inputOverride || input);
    const response = await fetch(inputToUse, {
      signal: abortController.signal,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const results = await WebAssembly.instantiateStreaming(response, importObject);
    return results.instance;
  },
  [input, importObject],
));

export const useWasm = (...args) => {
  const asyncTask = useAsyncTaskWasm(...args);
  useAsyncRun(asyncTask);
  return asyncTask;
};
