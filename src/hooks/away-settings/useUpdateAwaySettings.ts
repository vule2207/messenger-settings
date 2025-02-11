import { apiURL } from '@/constants';
import useMutation, { MutationOptions } from '../useMutation';
import { axiosPost, HeadersFormData } from '@/utils/axios/api';
import { PunchDataType } from '@/types/state';

export function useUpdateAwaySettings<TData>(options: MutationOptions<TData>) {
  return useMutation<TData, PunchDataType>(
    (data) => axiosPost<TData>(apiURL.awaySettings.save, data, HeadersFormData),
    options,
  );
}
