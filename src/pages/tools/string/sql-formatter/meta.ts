import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'sql-formatter',
  icon: 'carbon:sql',
  keywords: ['sql', 'format', 'beautify', 'query', 'pretty'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:sqlFormatter.title',
    description: 'string:sqlFormatter.description',
    shortDescription: 'string:sqlFormatter.shortDescription',
    longDescription: 'string:sqlFormatter.longDescription',
    userTypes: ['developers']
  }
});
