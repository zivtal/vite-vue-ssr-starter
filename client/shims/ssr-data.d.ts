import { ID_KEY } from '../../server/api/web/web.constants.ts';

export declare global {
  interface Window {
    __SSR_DATA__?: {
      [ID_KEY]: string;
      [key: string]: any;
    };
  }
}
