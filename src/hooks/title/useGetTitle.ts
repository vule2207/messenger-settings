import { axiosGet } from '@/utils/axios/api';
import useQuery from '../useQuery';
import { apiURL } from '@/constants';

export function useGetTitle<TData>() {
  return useQuery<TData>(() => axiosGet<TData>(apiURL.titleSettings.data));
}
