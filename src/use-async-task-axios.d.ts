import { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/named
import { AsyncTask, DependencyList } from './index';

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
  deps: DependencyList,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
export const useAxios: UseAsyncTaskAxios;
export default useAsyncTaskAxios;
