import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:caseConverter.title',
    description: 'string:caseConverter.description',
    shortDescription: 'string:caseConverter.shortDescription',
    longDescription: 'string:caseConverter.longDescription',
    userTypes: ['developers', 'generalUsers']
  },
  path: 'case-converter',
  icon: 'mdi:format-letter-case',
  keywords: [
    'case',
    'converter',
    'camel',
    'pascal',
    'snake',
    'kebab',
    'constant',
    'title'
  ],
  component: lazy(() => import('./index'))
});
