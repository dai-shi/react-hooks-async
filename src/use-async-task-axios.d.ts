import { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/named
import { AsyncTask } from './index';

export const useMemoPrev: <T>(
  creator: () => T,
  inputs: unknown[],
) => T;

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
export const useAxios: UseAsyncTaskAxios;
export default useAsyncTaskAxios;
