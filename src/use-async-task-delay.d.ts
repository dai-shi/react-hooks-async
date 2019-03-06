// eslint-disable-next-line import/named
import { AsyncTask, DependencyList } from './index';

export type UseAsyncTaskDelay = (
  milliSeconds: number,
  deps: DependencyList,
) => AsyncTask<true>;

export const useAsyncTaskDelay: UseAsyncTaskDelay;
export default useAsyncTaskDelay;
