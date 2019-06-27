export type DependencyList = ReadonlyArray<unknown>;

export type AsyncTask<Result> = {
  started: boolean;
  pending: boolean;
  error: Error | null;
  result: Result | null;
  start: () => void | null;
  abort: () => void | null;
};

export type UseAsyncTask = <Result>(
  func: (c: AbortController) => Promise<Result>,
  deps: DependencyList,
) => AsyncTask<Result>;

type Falsy = false | 0 | '' | null | undefined;
export type UseAsyncRun = (t: AsyncTask<unknown> | Falsy) => void;

export type UseAsyncCombine = (
  ...ts: AsyncTask<unknown>[],
) => AsyncTask<unknown> & { errorAll?: Error[] };

// core async hooks

export const useAsyncTask: UseAsyncTask;
export const useAsyncRun: UseAsyncRun;

// combining async hooks

export const useAsyncCombineAll: UseAsyncCombine;
export const useAsyncCombineSeq: UseAsyncCombine;
export const useAsyncCombineRace: UseAsyncCombine;

// timeout task

export type UseAsyncTaskTimeout = <Result>(
  func: () => Result,
  delay: number,
  deps: DependencyList,
) => AsyncTask<Result>;

export const useAsyncTaskTimeout: UseAsyncTaskTimeout;

// delay task

export type UseAsyncTaskDelay = (
  milliSeconds: number,
  deps: DependencyList,
) => AsyncTask<true>;

export const useAsyncTaskDelay: UseAsyncTaskDelay;

// fetch task

export type UseAsyncTaskFetch = <Result>(
  input: string | Request,
  init?: RequestInit,
  bodyReader?: (b: Body) => Promise<Result>,
) => AsyncTask<Result>;

export const useAsyncTaskFetch: UseAsyncTaskFetch;
export const useFetch: UseAsyncTaskFetch;

// axios task

export type UseAsyncTaskAxios = <
  Result,
  AxiosInstance = unknown,
  AxiosRequestConfig = unknown,
>(
  axios: AxiosInstance,
  config: AxiosRequestConfig,
  deps: DependencyList,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
export const useAxios: UseAsyncTaskAxios;
export default useAsyncTaskAxios;

// wasm task

export type UseAsyncTaskWasm = <Result>(
  input: string | Request,
  importObject?: object,
) => AsyncTask<Result>;

export const useAsyncTaskWasm: UseAsyncTaskWasm;
export const useWasm: UseAsyncTaskWasm;
