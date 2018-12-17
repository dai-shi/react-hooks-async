import { AxiosRequestConfig } from 'axios';
import { AsyncTask } from '..';

export type UseAsyncTaskAxios = <Result>(
  config: AxiosRequestConfig,
) => AsyncTask<Result>;

export const useAsyncTaskAxios: UseAsyncTaskAxios;
