import { axiosGet } from '@/utils/axios/api';
import useQuery from './useQuery';

export function useGetSettings<TData>(url: string) {
  return useQuery<TData>(() => axiosGet<TData>(url));
}
