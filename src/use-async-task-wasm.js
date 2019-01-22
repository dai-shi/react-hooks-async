import { useAsyncTask } from './use-async-task';
import { useAsyncRun } from './use-async-run';

const defaultImportObject = {};

export const useAsyncTaskWasm = (
  input,
  importObject = defaultImportObject,
) => useAsyncTask(
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
);

export const useWasm = (input, importObject) => {
  const asyncTask = useAsyncTaskWasm(input, importObject);
  useAsyncRun(asyncTask);
  return asyncTask;
};

export default useAsyncTaskWasm;
