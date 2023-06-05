import { createPreSignedToken } from '@/modules/google/createSignedToken';
import { getVerifiedToken } from '@/modules/google/getVerifiedToken';
import { getCalendarEventList } from '@/modules/google/getCalendarEventList';
import { getTimezoneDate, getTimeRemovedDate } from '@/modules/date';
import { createGanttChartText } from '@/modules/mermaid/createGanttChartText';
import { CALENDAR_ID, API_KEY } from '@/configs';

export const GET = async () => {
  const startDate = getTimeRemovedDate(getTimezoneDate(Date.now()));
  const endDate = startDate.add(7, 'day');
  const preSignedToken = createPreSignedToken();
  const { access_token } = await getVerifiedToken(preSignedToken);
  const calendarEventListResponse = await getCalendarEventList({
    calendarId: CALENDAR_ID,
    apiKey: API_KEY,
    accessToken: access_token,
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
  });
  const ganttChartText = createGanttChartText(startDate, endDate, calendarEventListResponse);
  return new Response(ganttChartText);
};
