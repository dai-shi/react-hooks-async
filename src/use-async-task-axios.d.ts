import { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/named
import { AsyncTask, DependencyList } from './index';

export const useMemoPrev: <T>(
  creator: () => T,
  deps: DependencyList,
) => T;

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
export const useAxios: UseAsyncTaskAxios;
export default useAsyncTaskAxios;
