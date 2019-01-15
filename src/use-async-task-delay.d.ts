import { AsyncTask, InputIdentityList } from './index';

export type UseAsyncTaskDelay = (
  milliSeconds: number,
  inputs: InputIdentityList,
) => AsyncTask<true>;

export const useAsyncTaskDelay: UseAsyncTaskDelay;
export default useAsyncTaskDelay;
