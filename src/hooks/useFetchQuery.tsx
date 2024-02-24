import {useQuery, UseQueryResult} from '@tanstack/react-query';

export const useFetchQuery = <TDate = unknown,>(
  key: string[],
  featchFn: () => Promise<TDate>,
): UseQueryResult<TDate, Error> => {
  return useQuery({
    queryKey: key,
    queryFn: featchFn,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });
};
