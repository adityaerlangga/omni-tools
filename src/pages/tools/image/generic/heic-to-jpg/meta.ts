import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:heicToJpg.title',
    description: 'image:heicToJpg.description',
    shortDescription: 'image:heicToJpg.shortDescription'
  },

  path: 'heic-to-jpg',
  icon: 'mdi:file-jpg-box',

  keywords: ['heic', 'heif', 'jpg', 'jpeg', 'convert', 'iphone', 'client-side'],
  component: lazy(() => import('./index'))
});
