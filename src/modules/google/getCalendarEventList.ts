import axios from 'axios';

export interface GetCalendarListResponse {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextSyncToken: string;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: Creator;
  organizer: Organizer;
  start: Start;
  end: End;
  transparency: string;
  iCalUID: string;
  sequence: number;
  reminders: Reminders;
  eventType: string;
}

export interface Creator {
  email: string;
}

export interface Organizer {
  email: string;
  displayName: string;
  self: boolean;
}

export interface Start {
  date: string;
}

export interface End {
  date: string;
}

export interface Reminders {
  useDefault: boolean;
}

interface GetCalendarEventListOptions {
  calendarId: string;
  accessToken: string;
  apiKey: string;

  timeMin?: string;
  timeMax?: string;
}

export const getCalendarEventList = async ({
  calendarId,
  accessToken,
  apiKey,
  timeMin,
  timeMax,
}: GetCalendarEventListOptions): Promise<GetCalendarListResponse> => {
  const { data } = await axios.get<GetCalendarListResponse>(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        key: apiKey,
        timeMin,
        timeMax,
        timeZone: 'Asia/Seoul',
      },
    },
  );
  return data;
};
