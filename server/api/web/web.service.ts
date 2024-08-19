import type { GetContent, GetContentReq } from '../../models';
import { GET_CONTENT } from './web.constants';
import { Http } from '../../services';
import config from '../../config';
import { getUrlWithQuery } from '../../helpers';

export const webService = {
  [GET_CONTENT]: async (host: string, query: GetContentReq, cookie?: string): Promise<GetContent> => {
    const url = getUrlWithQuery(`${GET_CONTENT}/${host}`, query);

    try {
      return await Http.get<GetContent>(url, { headers: { Cookie: cookie } });
    } catch (e) {
      console.error(`webService:${config.BASE_API}/${url}`, e);

      throw e;
    }
  },
};
