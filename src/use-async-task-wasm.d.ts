import { Request } from 'node-fetch';
import { AsyncTask } from './index';

export type UseAsyncTaskWasm = <Result>(
  input: string | Request,
  inputObject?: object,
) => AsyncTask<Result>;

export const useAsyncTaskWasm: UseAsyncTaskWasm;
export const useWasm: UseAsyncTaskWasm;
export default useAsyncTaskWasm;
