import { axiosPost, HeadersFormData } from '@/utils/axios/api';
import useMutation, { MutationOptions } from '../useMutation';
import { apiURL } from '@/constants';

export function useUpdateTitle<TData>(options: MutationOptions<TData>) {
  return useMutation<TData, { title: string }>(
    (data) => axiosPost<TData>(apiURL.titleSettings.save, data, HeadersFormData),
    options,
  );
}
