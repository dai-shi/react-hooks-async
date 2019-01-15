import { AxiosRequestConfig } from 'axios';
import { AsyncTask } from './index';

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
export default useAsyncTaskAxios;
