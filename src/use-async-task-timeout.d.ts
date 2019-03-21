// eslint-disable-next-line import/named
import { AsyncTask, DependencyList } from './index';

export type UseAsyncTaskTimeout = <Result>(
  func: () => Result,
  delay: number,
  deps: DependencyList,
) => AsyncTask<Result>;

export const useAsyncTaskTimeout: UseAsyncTaskTimeout;
export default useAsyncTaskTimeout;
