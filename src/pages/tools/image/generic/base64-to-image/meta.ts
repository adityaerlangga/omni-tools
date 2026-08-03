import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:base64ToImage.title',
    description: 'image:base64ToImage.description',
    shortDescription: 'image:base64ToImage.shortDescription'
  },

  path: 'base64-to-image',
  icon: 'mdi:image-outline',

  keywords: [
    'base64',
    'image',
    'decode',
    'data url',
    'convert',
    'preview',
    'client-side'
  ],
  component: lazy(() => import('./index'))
});
