import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('converters', {
  path: 'zip-extract',
  icon: 'mdi:zip-box',
  keywords: ['zip', 'extract', 'unzip', 'archive', 'decompress'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'converters:zipExtract.title',
    description: 'converters:zipExtract.description',
    shortDescription: 'converters:zipExtract.shortDescription',
    userTypes: ['generalUsers', 'developers']
  }
});
