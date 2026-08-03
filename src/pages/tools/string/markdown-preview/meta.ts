import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  path: 'markdown-preview',
  icon: 'mdi:language-markdown',
  keywords: ['markdown', 'preview', 'md', 'html', 'render', 'gfm'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'string:markdownPreview.title',
    description: 'string:markdownPreview.description',
    shortDescription: 'string:markdownPreview.shortDescription',
    longDescription: 'string:markdownPreview.longDescription',
    userTypes: ['developers']
  }
});
