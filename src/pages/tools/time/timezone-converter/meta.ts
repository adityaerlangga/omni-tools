import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('time', {
  path: 'timezone-converter',
  icon: 'mdi:web-clock',
  keywords: [
    'timezone',
    'convert',
    'time',
    'zone',
    'iana',
    'utc',
    'datetime'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'time:timezoneConverter.title',
    description: 'time:timezoneConverter.description',
    shortDescription: 'time:timezoneConverter.shortDescription',
    userTypes: ['generalUsers', 'developers']
  }
});
