import { axiosPost, HeadersFormData } from '@/utils/axios/api';
import useMutation, { MutationOptions } from './useMutation';

export function useUpdateSettings<TData, TVariables>(url: string, options: MutationOptions<TData>) {
  return useMutation<TData, TVariables>(
    (data) => axiosPost<TData, TVariables>(url, data, HeadersFormData),
    options,
  );
}
