import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:loremIpsum.title',
    description: 'string:loremIpsum.description',
    shortDescription: 'string:loremIpsum.shortDescription',
    longDescription: 'string:loremIpsum.longDescription',
    userTypes: ['developers', 'generalUsers']
  },
  path: 'lorem-ipsum',
  icon: 'mdi:format-text',
  keywords: ['lorem', 'ipsum', 'placeholder', 'dummy', 'text', 'generator'],
  component: lazy(() => import('./index'))
});
