import { AsyncTask } from './index';

export type UseAsyncTaskTimeout = <Result>(
  func: () => Result,
  delay: number,
) => AsyncTask<Result>;

export const useAsyncTaskTimeout: UseAsyncTaskTimeout;
export default useAsyncTaskTimeout;
