export const getUrlWithQuery = (url: string, query: Record<string, string | undefined>): string => {
  const params = Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`);

  return params.length ? `${url}?${params.join('&')}` : url;
};
