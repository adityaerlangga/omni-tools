import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('converters', {
  path: 'zip-create',
  icon: 'mdi:folder-zip',
  keywords: ['zip', 'create', 'archive', 'compress', 'files', 'bundle'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'converters:zipCreate.title',
    description: 'converters:zipCreate.description',
    shortDescription: 'converters:zipCreate.shortDescription',
    userTypes: ['generalUsers', 'developers']
  }
});
