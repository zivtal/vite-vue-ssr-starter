import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api, RequestHeaders } from './index.ts';

type ApiServiceConfig = Partial<{
  noCache?: boolean;
  allowOnceAtTime?: boolean;
  uniqueUrl?: boolean;
}>;

type AxiosGetRequestConfig = AxiosRequestConfig & ApiServiceConfig;
type AxiosPostRequestConfig = AxiosRequestConfig & Omit<ApiServiceConfig, 'noCache'>;

export const Http = {
  requestControllers: new Map(),

  async makeRequest<T>(request: () => Promise<AxiosResponse<T>>, key?: string): Promise<T> {
    try {
      const { data } = (await request()) || {};

      return data;
    } finally {
      if (key) {
        Http.requestControllers.delete(key);
      }
    }
  },

  signalKey(value: string): string {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
    }

    return (hash >>> 0).toString(16);
  },

  signalCancel(key: string): void {
    const controller = Http.requestControllers.get(key);

    if (controller) {
      controller.abort();
      Http.requestControllers.delete(key);
    }
  },

  getAbortSignal(value: string, allowOnceAtTime?: boolean): AbortSignal {
    const key = Http.signalKey(value);

    if (allowOnceAtTime) {
      Http.signalCancel(key);
    }

    const abortController = new AbortController();
    Http.requestControllers.set(key, abortController);

    return abortController.signal;
  },

  async get<Response>(url: string, config?: AxiosGetRequestConfig): Promise<Response> {
    const { noCache, allowOnceAtTime, uniqueUrl = true, ...restConfig } = config || {};

    const axiosConfig = {
      signal: Http.getAbortSignal(uniqueUrl ? url : url.split('?')[0], allowOnceAtTime),
      ...restConfig,
      ...(noCache ? { headers: { 'Cache-Control': 'no-cache', ...(restConfig?.headers || {}) } } : {}),
    };

    return await Http.makeRequest<Response>(() => api.get<Response>(url, axiosConfig));
  },

  async put<Response, Payload>(url: string, data: Payload, config?: AxiosRequestConfig): Promise<Response> {
    return await Http.makeRequest<Response>(() => api.put<Response>(url, data, config));
  },

  async post<Response, Payload = never>(url: string, data?: Payload, config?: AxiosPostRequestConfig): Promise<Response> {
    const { allowOnceAtTime, uniqueUrl = false, ...restConfig } = config || {};

    const axiosConfig = {
      signal: Http.getAbortSignal(JSON.stringify(uniqueUrl ? [url, data] : url), allowOnceAtTime),
      ...(data instanceof FormData ? { headers: { [RequestHeaders.CONTENT_TYPE]: 'multipart/form-data' } } : {}),
      ...(restConfig || {}),
    };

    return await Http.makeRequest<Response>(() => api.post<Response>(url, data, axiosConfig));
  },

  async patch<Response, Payload = never>(url: string, data: Payload, config?: AxiosRequestConfig): Promise<Response> {
    return await Http.makeRequest<Response>(() => api.patch<Response>(url, data, config));
  },

  async delete<Response>(url: string, config?: AxiosRequestConfig): Promise<Response> {
    return await Http.makeRequest<Response>(() => api.delete<Response>(url, config));
  },
};
