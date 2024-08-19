// router.d.ts
import 'vue-router';

interface DynamicComponent {
  component: string;
  props?: {
    title?: string;
    description?: string;
    src?: string | Array<string>;
    link?: string;
    url?: string;
    [key: string]: any;
  };
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    description?: string;
    components?: Array<string>;
    isMainMenuLink?: boolean;
    isHelpfulLink?: boolean;
    isMoreInfoLink?: boolean;
  }
}
