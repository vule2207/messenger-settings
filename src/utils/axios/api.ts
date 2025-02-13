import { NavigateFunction } from 'react-router';

import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { getBaseUrl, getGroupwareUrl } from '@/utils';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

//pass new generated access token here
// const token = accessToken
export const HeadersFormData = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

export type CustomAxiosConfigType = Omit<
  AxiosRequestConfig,
  'method' | 'url' | 'headers' | 'responseType' | 'data' | 'params'
>;

export const axiosApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
    // 'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: getGroupwareUrl(),
  withCredentials: true,
});

/* eslint-disable @typescript-eslint/no-unused-vars */
export const setupInterceptors = (navigate: NavigateFunction) => {
  axiosApi.interceptors.request.use((config: any) => {
    // const token = localStorage.getItem('token')
    if (config.isBaseUrl) {
      config.baseURL = getBaseUrl();
    } else {
      config.baseURL = getGroupwareUrl();
    }
    return config;
  });

  axiosApi.interceptors.response.use(
    (response) => {
      // const responseData = response?.data;
      // const dataError = responseData?.error;
      // if (dataError && dataError?.code && dataError.code == 808) {
      //   passwordExpirationState.setType(parseInt(dataError.type));
      //   navigate(PASSWD_EXPIRATION_URL);
      // }

      return response;
    },
    (error) => {
      const serverResponse = error?.response;
      const errorStatus = serverResponse?.status;
      const responseData = serverResponse?.data;

      switch (errorStatus) {
        case 404:
          if (!responseData?.success) {
            const message = responseData?.msg || 'Not Found';
            // message && enqueueErrorBar(message);
          }
          break;
        case 401:
          break;
        case 505:
          if (!responseData?.success) {
            const message = responseData?.error || '';
            // enqueueErrorBar(message);
          }
          return responseData;
        case 0:
          // enqueueErrorBar('Server Error');
          break;
      }

      if (typeof errorStatus === 'undefined') {
        // enqueueErrorBar('Unexpected Error');
      }

      console.log(error);
    },
  );
};

export async function axiosAPI<T>(
  endPoint: string,
  method: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: method,
    url: endPoint as string,
    headers: headers,
    responseType: responseType as ResponseType,
  };

  if (method === 'GET') {
    config.params = payload;
  } else {
    config.data = payload;
  }

  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function axiosGet<T, V = any>(
  endPoint: string,
  payload: V,
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: 'GET',
    url: endPoint as string,
    params: payload || {},
    headers: headers,
    responseType: responseType as ResponseType,
  };
  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return null;
    }
    console.error('Unexpected error:', error);
    return null;
  }
}

/**
 * Post Method
 */
export async function axiosPost<T, V>(
  endPoint: string,
  payload: V,
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: 'POST',
    url: endPoint as string,
    data: payload,
    headers: headers,
    responseType: responseType as ResponseType,
  };
  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return null;
    }
    console.error('Unexpected error:', error);
    return null;
  }
}

/**
 * Delete Method
 */
export async function axiosDel<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: 'DELETE',
    url: endPoint as string,
    data: payload,
    headers: headers,
    responseType: responseType as ResponseType,
  };
  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return null;
    }
    console.error('Unexpected error:', error);
    return null;
  }
}

/**
 * PUT Method
 */
export async function axiosPut<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: 'PUT',
    url: endPoint as string,
    data: payload,
    headers: headers,
    responseType: responseType as ResponseType,
  };
  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return null;
    }
    console.error('Unexpected error:', error);
    return null;
  }
}

export async function axiosPatch<T>(
  endPoint: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
) {
  let config: AxiosRequestConfig<any> = {
    method: 'PATCH',
    url: endPoint as string,
    params: payload,
    headers: headers,
    responseType: responseType as ResponseType,
  };
  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response = await axiosApi<T>(config);
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return null;
    }
    console.error('Unexpected error:', error);
    return null;
  }
}
