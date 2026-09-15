import useSWR from "swr";

/**
 * Creates a reusable SWR hook.
 *
 * @param {Object} config - The hook configuration
 * @param {string} config.key - Base cache key, combined with the call-time params
 * @param {Function} config.fetcher - Service function, invoked with the call-time params
 * @param {boolean} [config.isPaginated=false] - When `true`, the API response is assumed to be
 * paginated (i.e. `{ results: [...], page, totalPages, limit }`), so the hook's `data` is
 * unwrapped from `response.results` and its pagination info is exposed as `pagination`
 * @returns {Function} Hook that accepts a params object and returns
 * `{ data, isLoading, isError, mutate, pagination }`
 */
export const createSWRHook = ({ key, fetcher, isPaginated = false }) => {
  return (params = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
      [key, params], // Key for caching; includes params to make it dynamic
      () => fetcher(params) // Fetcher function, invoked with params
    );

    return {
      data: isPaginated ? data?.results : data,
      isLoading,
      isError: !!error,
      mutate,
      pagination: isPaginated
        ? {
            page: data?.page,
            totalPages: data?.totalPages,
            limit: data?.limit,
          }
        : undefined,
    };
  };
};
