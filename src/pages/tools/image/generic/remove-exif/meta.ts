import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:removeExif.title',
    description: 'image:removeExif.description',
    shortDescription: 'image:removeExif.shortDescription'
  },

  path: 'remove-exif',
  icon: 'mdi:shield-remove-outline',

  keywords: [
    'exif',
    'metadata',
    'remove',
    'strip',
    'privacy',
    'image',
    'client-side'
  ],
  component: lazy(() => import('./index'))
});
