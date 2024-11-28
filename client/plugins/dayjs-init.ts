import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import '@/plugins/dayjs-init';
import 'dayjs/locale/he';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

dayjs.extend(updateLocale);
dayjs.updateLocale('he', {
  weekdays: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
});
