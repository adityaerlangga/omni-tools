import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'json-to-yaml',
  icon: 'nonicons:yaml-16',
  keywords: ['json', 'yaml', 'convert', 'yml', 'dump'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:jsonToYaml.title',
    description: 'json:jsonToYaml.description',
    shortDescription: 'json:jsonToYaml.shortDescription',
    longDescription: 'json:jsonToYaml.longDescription'
  }
});
