import type { Metadata } from './metadata';
import type { ManifestIcon } from './manifest';
import { ValueOf } from './value-of';

enum Direction {
  LTR = 'ltr',
  RTL = 'rtl',
}

export interface SSRData {
  language?: string;
  direction?: ValueOf<Direction>;
  metadata?: Metadata;
  icons?: Array<ManifestIcon>;
  style?: Record<string, Record<string, string>>;
  [key: string]: any;
}
