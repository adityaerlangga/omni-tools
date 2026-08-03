import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('json', {
  path: 'yaml-formatter',
  icon: 'material-symbols:code',
  keywords: ['yaml', 'format', 'beautify', 'validate', 'yml', 'prettify'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'json:yamlFormatter.title',
    description: 'json:yamlFormatter.description',
    shortDescription: 'json:yamlFormatter.shortDescription',
    longDescription: 'json:yamlFormatter.longDescription'
  }
});
