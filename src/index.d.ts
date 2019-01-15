export type InputIdentityList = ReadonlyArray<unknown>;

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
export type UseAsyncRun = (t: AsyncTask<unknown> | Falsy) => void;

export type UseAsyncCombine = (...ts: Array<AsyncTask<unknown>>)
  => AsyncTask<unknown> & { errorAll?: Error[] };

// core async hooks

export { useAsyncTask } from './use-async-task';
export { useAsyncRun } from './use-async-run';

// combining async hooks

export { useAsyncCombineAll } from './use-async-combine-all';
export { useAsyncCombineSeq } from './use-async-combine-seq';
export { useAsyncCombineRace } from './use-async-combine-race';

// custom async hooks

export { useAsyncTaskTimeout } from './use-async-task-timeout';
export { useAsyncTaskDelay } from './use-async-task-delay';
export { useAsyncTaskFetch } from './use-async-task-fetch';
