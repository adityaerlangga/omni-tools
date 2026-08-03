import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:jwtDecoder.title',
    description: 'string:jwtDecoder.description',
    shortDescription: 'string:jwtDecoder.shortDescription',
    longDescription: 'string:jwtDecoder.longDescription',
    userTypes: ['developers']
  },
  path: 'jwt-decoder',
  icon: 'mdi:shield-key-outline',
  keywords: [
    'jwt',
    'token',
    'decode',
    'json',
    'web',
    'token',
    'header',
    'payload'
  ],
  component: lazy(() => import('./index'))
});
