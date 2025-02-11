import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

type ApiFunction<TData> = () => Promise<TData | null>;

type QueryOptions = {
  enabled?: boolean;
};

type QueryResult<TData> = {
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
};

function useQuery<TData>(
  apiFunction: ApiFunction<TData>,
  options: QueryOptions = { enabled: true },
): QueryResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(options.enabled ?? true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await apiFunction();
      setData(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      setIsError(true);
      setError(axiosError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled) fetchData();
  }, [options.enabled]);

  return { data, isLoading, isError, error, refetch: fetchData };
}

export default useQuery;
