import type { GetContent } from '../../models';
import { GET_CONTENT, GET_WEBSITE_CONTENT } from './web.constants';
import { Http } from '../../services';

const getQuery = (params: Record<string, string | undefined>) => {
  return Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

export const webService = {
  [GET_CONTENT]: async (identify: string, lang?: string, cookie?: string): Promise<GetContent> => {
    try {
      const url = `${GET_WEBSITE_CONTENT}/${identify}?${getQuery({ lang })}`;

      return await Http.get<GetContent>(url, { headers: { Cookie: cookie } });
    } catch (e) {
      console.error(`webService:${GET_WEBSITE_CONTENT}`, e);

      throw e;
    }
  },
};
