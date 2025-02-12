import { axiosGet } from '@/utils/axios/api';
import useQuery, { QueryOptions } from './useQuery';

export function useGetSettings<TData>(url: string, options?: QueryOptions) {
  return useQuery<TData>(() => axiosGet<TData>(url), options);
}
