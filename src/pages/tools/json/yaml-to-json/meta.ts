import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'yaml-to-json',
  icon: 'nonicons:yaml-16',
  keywords: ['yaml', 'json', 'convert', 'parse', 'yml'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:yamlToJson.title',
    description: 'json:yamlToJson.description',
    shortDescription: 'json:yamlToJson.shortDescription',
    longDescription: 'json:yamlToJson.longDescription'
  }
});
