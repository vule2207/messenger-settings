import { apiURL } from '@/constants';
import useMutation, { MutationOptions } from '../useMutation';
import { axiosPost, HeadersFormData } from '@/utils/axios/api';
import { PunchDataType } from '@/types/state';

export function useUpdateAutoPunch<TData>(options: MutationOptions<TData>) {
  return useMutation<TData, PunchDataType>(
    (data) => axiosPost<TData>(apiURL.autoTimePunch.save, data, HeadersFormData),
    options,
  );
}
