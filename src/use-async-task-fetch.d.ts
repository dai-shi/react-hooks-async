import { Body, Request, RequestInit } from 'node-fetch';
import { AsyncTask } from './index';

export type UseAsyncTaskFetch = <Result>(
  input: string | Request,
  init?: RequestInit,
  bodyReader?: (b: Body) => Promise<Result>,
) => AsyncTask<Result>;

export const useAsyncTaskFetch: UseAsyncTaskFetch;
export default useAsyncTaskFetch;
