import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:imageToBase64.title',
    description: 'image:imageToBase64.description',
    shortDescription: 'image:imageToBase64.shortDescription'
  },

  path: 'image-to-base64',
  icon: 'mdi:file-code-outline',

  keywords: ['image', 'base64', 'data url', 'encode', 'convert', 'client-side'],
  component: lazy(() => import('./index'))
});
