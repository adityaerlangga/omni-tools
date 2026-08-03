import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { InitialValuesType } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const INPUT_FORMATS = [
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm',
  'YYYY-MM-DD'
];

export function convertTimezone(options: InitialValuesType): string {
  const { dateTime, fromTimezone, toTimezone } = options;
  if (!dateTime?.trim() || !fromTimezone || !toTimezone) return '';

  try {
    let parsed: dayjs.Dayjs | null = null;

    for (const format of INPUT_FORMATS) {
      const candidate = dayjs.tz(dateTime.trim(), format, fromTimezone);
      if (candidate.isValid()) {
        parsed = candidate;
        break;
      }
    }

    if (!parsed) {
      const candidate = dayjs.tz(dateTime.trim(), fromTimezone);
      if (candidate.isValid()) parsed = candidate;
    }

    if (!parsed || !parsed.isValid()) return '';

    return parsed.tz(toTimezone).format('YYYY-MM-DD HH:mm:ss z');
  } catch {
    return '';
  }
}
