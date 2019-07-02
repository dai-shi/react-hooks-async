import { useCallbackOne as useCallback } from 'use-memo-one';

import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const defaultImportObject = {};

export const useAsyncTaskWasm = (
  input,
  importObject = defaultImportObject,
) => useAsyncTask(useCallback(
  async (abortController) => {
    const response = await fetch(input, {
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
