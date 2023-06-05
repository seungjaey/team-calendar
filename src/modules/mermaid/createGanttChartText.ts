import { join, map, pipe } from '@fxts/core';
import { get } from 'lodash-es';
import { getTimezoneDate } from '@/modules/date';
import type { GetCalendarListResponse } from '@/modules/google/getCalendarEventList';
import type { Dayjs } from 'dayjs';

export const createGanttChartText = (startDate: Dayjs, endDate: Dayjs, data: GetCalendarListResponse) => {
  const result = pipe(
    data.items,
    map(({ start, end, summary }) => ({ summary, start: get(start, 'date'), end: get(end, 'date') })),
    map(({ summary, start, end }) => ({ summary, start: getTimezoneDate(start), end: getTimezoneDate(end) })),
    map(({ summary, start, end }) => ({
      summary,
      start: startDate.isAfter(start) ? startDate : start,
      end: endDate.isAfter(end) ? end : endDate,
    })),
    map(({ summary, start, end }) => `${summary}: ${start.format('YYYY-MM-DD')}, ${end.diff(start, 'day')}d`),
    join('\n\t'),
  );
  // TODO: Apply Builder pattern
  return `gantt\n\ttitle Test..!\n\tdateFormat YYYY-MM-DD\n\tsection This Week Events\n\t${result}`;
};
