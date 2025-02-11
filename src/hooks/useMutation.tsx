import { AxiosError } from 'axios';
import { useState } from 'react';

type ApiFunction<TVariables, TData> = (variables: TVariables) => Promise<TData | null>;

export type MutationOptions<TData> = {
  onSuccess?: (data: TData | null) => void;
  onError?: (error: AxiosError) => void;
};

type MutationResult<TData, TVariables> = {
  mutate: (variables: TVariables) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  data: TData | null;
};

function useMutation<TData, TVariables>(
  apiFunction: ApiFunction<TVariables, TData>,
  options: MutationOptions<TData> = {},
): MutationResult<TData, TVariables> {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutate = async (variables: TVariables, mutateOptions: MutationOptions<TData> = {}) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await apiFunction(variables);
      setData(response);
      options.onSuccess?.(response);
      mutateOptions.onSuccess?.(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      setIsError(true);
      setError(axiosError);
      options.onError?.(axiosError);
      mutateOptions.onError?.(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, isError, error, data };
}

export default useMutation;
