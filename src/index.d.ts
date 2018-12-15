import { AxiosRequestConfig } from 'axios';
import { Body, Request, RequestInit } from 'node-fetch';

type InputIdentityList = ReadonlyArray<unknown>;

export type AsyncTask<Result> = {
  taskId: symbol,
  started: boolean,
  pending: boolean,
  error: Error | void,
  result: Result | void,
  start: () => void,
  abort: () => void,
};

export type UseAsyncTask = <Result>(
  func: (c: AbortController) => Result,
  inputs: InputIdentityList,
) => AsyncTask<Result>;

type Falsy = false | '' | null | undefined;
export type UseAsyncTaskRun = (t: AsyncTask<unknown> | Falsy) => void;

export type UseAsyncTaskCombine = (...ts: Array<AsyncTask<unknown>>)
  => AsyncTask<unknown> & { errorAll?: Error[] };

export type UseAsyncTaskTimeout = <Result>(
  func: () => Result,
  delay: number,
) => AsyncTask<Result>;

export type UseAsyncTaskDelay = (
  milliSeconds: number,
  inputs: InputIdentityList,
) => AsyncTask<true>;

export type UseAsyncTaskFetch = <Result>(
  input: string | Request,
  init?: RequestInit,
  bodyReader?: (b: Body) => Promise<Result>,
) => AsyncTask<Result>;

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
) => AsyncTask<Result>;

// core async hooks

export const useAsyncTask: UseAsyncTask;
export const useAsyncRun: UseAsyncTaskRun;

// combining async hooks

export const useAsyncCombineAll: UseAsyncTaskCombine;
export const useAsyncCombineSeq: UseAsyncTaskCombine;
export const useAsyncCombineRace: UseAsyncTaskCombine;

// custom async hooks

export const useAsyncTaskTimeout: UseAsyncTaskTimeout;
export const useAsyncTaskDelay: UseAsyncTaskDelay;
export const useAsyncTaskFetch: UseAsyncTaskFetch;
export const useAsyncTaskAxios: UseAsyncTaskAxios;
