import type { GetDataRes } from './data.types';
import { GET_DATA, GET_WEBSITE_DATA } from './data.constants.js';
import { Http } from '../../services';
import config from '../../config';

const TIMEOUT = 3 * 60 * 1000; // 3 minutes

export const dataService = {
  [GET_DATA]: async (id: string, idKey: string): Promise<Omit<GetDataRes, 'data'> & { data: Buffer }> => {
    const url = idKey ? `${GET_WEBSITE_DATA}/${id}?templateId=${idKey}` : `${GET_WEBSITE_DATA}/${id}`;

    try {
      const res = await Http.get<GetDataRes>(url, { timeout: TIMEOUT });
      const { data, type } = res;

      return { type, data: Buffer.from(data, 'base64') };
    } catch (e) {
      console.error(`webService:${config.BASE_API}/${url}`, e);

      throw e;
    }
  },
};
