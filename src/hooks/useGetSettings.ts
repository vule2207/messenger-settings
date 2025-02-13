import { axiosGet } from '@/utils/axios/api';
import useQuery, { QueryOptions } from './useQuery';

export function useGetSettings<TData, TParams = any>(
  url: string,
  params?: TParams,
  options?: QueryOptions,
) {
  return useQuery<TData>(() => axiosGet<TData>(url, params), options);
}
