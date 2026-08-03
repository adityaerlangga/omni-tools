import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:exifViewer.title',
    description: 'image:exifViewer.description',
    shortDescription: 'image:exifViewer.shortDescription'
  },

  path: 'exif-viewer',
  icon: 'mdi:information-outline',

  keywords: [
    'exif',
    'metadata',
    'viewer',
    'image',
    'gps',
    'camera',
    'client-side'
  ],
  component: lazy(() => import('./index'))
});
