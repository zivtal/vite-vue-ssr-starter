import * as util from 'util';
import config from '../config';

const isDevEnv = !config.IS_PROD_ENV;

export const logger = {
  log: (name: string, ...args: Array<any>) => {
    if (isDevEnv) {
      console.log(`${name}\n`, ...args.map((arg) => (typeof arg === 'string' ? `\n${arg}\n` : util.inspect(arg, false, null, true))));
    }
  },
  error: (name: string, ...args: Array<any>) => {
    console.error(`${name}\n`, ...args.map((arg) => (typeof arg === 'string' ? `\n${arg}\n` : util.inspect(arg, false, null, true))));
  },
  info: (name: string, ...args: Array<any>) => {
    if (isDevEnv) {
      console.info(name, ...args.map((arg) => (typeof arg === 'string' ? arg : util.inspect(arg, false, null, true))));
    }
  },
  warm: (name: string, ...args: Array<any>) => {
    if (isDevEnv) {
      console.warn(`${name}\n`, ...args.map((arg) => (typeof arg === 'string' ? `\n${arg}\n` : util.inspect(arg, false, null, true))));
    }
  },
};
