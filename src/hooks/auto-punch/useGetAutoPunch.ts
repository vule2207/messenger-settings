import { apiURL } from '@/constants';
import useQuery from '../useQuery';
import { axiosGet } from '@/utils/axios/api';

export function useGetAutoPunch<TData>() {
  return useQuery<TData>(() => axiosGet<TData>(apiURL.autoTimePunch.data));
}
