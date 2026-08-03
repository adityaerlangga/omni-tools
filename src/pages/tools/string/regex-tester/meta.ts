import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:regexTester.title',
    description: 'string:regexTester.description',
    shortDescription: 'string:regexTester.shortDescription',
    longDescription: 'string:regexTester.longDescription',
    userTypes: ['developers']
  },
  path: 'regex-tester',
  icon: 'mdi:regex',
  keywords: [
    'regex',
    'regexp',
    'regular',
    'expression',
    'match',
    'test',
    'replace'
  ],
  component: lazy(() => import('./index'))
});
