import { ValueOf } from './value-of';
import { ID_KEY } from '../api/web/web.constants';

enum Direction {
  LTR = 'ltr',
  RTL = 'rtl',
}

interface Metadata {
  title: string;
  description: string;
  keywords?: Array<string>;
  image?: string;
}

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

interface Manifest {
  short_name: string;
  name: string;
  icons: Array<ManifestIcon>;
  start_url: string;
  display: string;
  theme_color: string;
  background_color: string;
}

export interface GetContent {
  [ID_KEY]: string;
  direction?: ValueOf<Direction>;
  metadata?: Metadata;
  style?: Record<string, Record<string, string>>;
  language?: string;
  favicon?: string;
  manifest: Manifest;
  [key: string]: any;
}

export type Content = GetContent;

export type GetContentReq = Partial<{ lang: string; currency: string }>;
