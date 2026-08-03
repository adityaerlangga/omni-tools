import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'fake-json',
  icon: 'mdi:code-json',
  keywords: ['fake', 'json', 'sample', 'generate', 'mock', 'dummy'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:fakeJson.title',
    description: 'json:fakeJson.description',
    shortDescription: 'json:fakeJson.shortDescription',
    longDescription: 'json:fakeJson.longDescription',
    userTypes: ['developers']
  }
});
