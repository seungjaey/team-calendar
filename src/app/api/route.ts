import { NextResponse } from 'next/server';

import { google } from 'googleapis';

import CONFIGS from '@/configs';

const { API_KEY, TEAM_CALENDAR_ID } = CONFIGS;

const calendar = google.calendar({
  version: 'v3',
  auth: API_KEY,
});

export async function GET() {
  const res = await calendar.events.list({
    calendarId: TEAM_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  console.log(events);
  return NextResponse.json('ok');
}
