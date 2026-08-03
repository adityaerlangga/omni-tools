import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'http-status-codes',
  icon: 'mdi:http',
  keywords: [
    'http',
    'status',
    'codes',
    'response',
    'rest',
    'api',
    '404',
    '500'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:httpStatusCodes.title',
    description: 'number:httpStatusCodes.description',
    shortDescription: 'number:httpStatusCodes.shortDescription',
    userTypes: ['developers']
  }
});
