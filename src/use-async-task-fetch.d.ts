// eslint-disable-next-line import/named
import { AsyncTask } from './index';

export type UseAsyncTaskFetch = <Result>(
  input: string | Request,
  init?: RequestInit,
  bodyReader?: (b: Body) => Promise<Result>,
) => AsyncTask<Result>;

export const useAsyncTaskFetch: UseAsyncTaskFetch;
export const useFetch: UseAsyncTaskFetch;
export default useAsyncTaskFetch;
