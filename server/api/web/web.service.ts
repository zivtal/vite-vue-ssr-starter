import { GET_CONTENT, GET_WEBSITE_CONTENT } from './web.constants';
import { SSRData } from '../../models';
import { Http } from '../../services/http';

const getQuery = (params: Record<string, string | undefined>) => {
  return Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

export const webService = {
  [GET_CONTENT]: async (identify: string, lang?: string, cookie?: string): Promise<SSRData> => {
    try {
      const url = `${GET_WEBSITE_CONTENT}/${identify}?${getQuery({ lang })}`;

      return await Http.get<SSRData>(url, { headers: { Cookie: cookie } });
    } catch (e) {
      console.error('webService:get-content', e);

      throw e;
    }
  },
};
