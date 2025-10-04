import {
  parseJSON
} from 'date-fns';

export function parseTime(dateStr: string): number {
  const d: Date = parseJSON(dateStr);
  return d.valueOf() + d.getTimezoneOffset() * 60000;
}