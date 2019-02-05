import { Request } from 'node-fetch';
// eslint-disable-next-line import/named
import { AsyncTask } from './index';

export type UseAsyncTaskWasm = <Result>(
  input: string | Request,
  importObject?: object,
) => AsyncTask<Result>;

export const useAsyncTaskWasm: UseAsyncTaskWasm;
export const useWasm: UseAsyncTaskWasm;
export default useAsyncTaskWasm;
