import { OrgTreeParamsType } from '@/types';
import useQuery, { QueryOptions } from './useQuery';
import { apiURL } from '@/constants';
import { axiosGet } from '@/utils/axios/api';
import useMutation, { MutationOptions } from './useMutation';

export function useGetOrgData<TData>(params: OrgTreeParamsType, opt: QueryOptions = {}) {
  let url = apiURL.kickOutUsers.org;
  if (params.idURL) {
    url = url + '/' + params.idURL;
  }
  return useQuery<TData>(() => axiosGet(url, params), opt);
}

export type ExpandDataType = {
  idURL?: string | number;
};
export function useGetOrgExpandData<TData = any>(opt: MutationOptions<TData> = {}) {
  return useMutation<TData, ExpandDataType>((params) => {
    let url = apiURL.kickOutUsers.org;
    if (params.idURL) {
      url = url + '/' + params.idURL;
    }
    return axiosGet(url, params);
  }, opt);
}

export function getUsersInDept<TData = any>(params: any) {
  let url = apiURL.kickOutUsers.org;
  if (params.idURL) {
    url = url + '/' + params.idURL;
    delete params.idURL;
  }
  return axiosGet<TData>(url, params);
}
