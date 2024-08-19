import type { GetContent } from '../../models';
import { GET_CONTENT, GET_WEBSITE_CONTENT } from './web.constants';
import { Http } from '../../services';
import config from '../../config';

const getQuery = (params: Record<string, string | undefined>) => {
  return Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

export const webService = {
  [GET_CONTENT]: async (host: string, lang?: string, cookie?: string): Promise<GetContent> => {
    const url = `${GET_WEBSITE_CONTENT}/${host}?${getQuery({ lang })}`;

    try {
      return await Http.get<GetContent>(url, { headers: { Cookie: cookie } });
    } catch (e) {
      console.error(`webService:${config.BASE_API}/${url}`, e);

      throw e;
    }
  },
};
