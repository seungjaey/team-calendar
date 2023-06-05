import dayjs, { Dayjs, isDayjs } from 'dayjs';
import type { ConfigType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getTimeRemovedDate = (date: Dayjs) => date.hour(0).minute(0).second(0).millisecond(0);

export const getTimezoneDate = (date: ConfigType) => dayjs.tz(date, 'Asia/Seoul');

export default dayjs;
