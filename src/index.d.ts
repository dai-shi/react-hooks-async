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

export { useAsyncTask } from './use-async-task';
export { useAsyncRun } from './use-async-run';

// combining async hooks

export { useAsyncCombineAll } from './use-async-combine-all';
export { useAsyncCombineSeq } from './use-async-combine-seq';
export { useAsyncCombineRace } from './use-async-combine-race';
