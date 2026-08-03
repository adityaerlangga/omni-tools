import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('image-generic', {
  i18n: {
    name: 'image:qrDecoder.title',
    description: 'image:qrDecoder.description',
    shortDescription: 'image:qrDecoder.shortDescription'
  },

  path: 'qr-decoder',
  icon: 'mdi:qrcode-scan',

  keywords: [
    'qr',
    'qrcode',
    'decode',
    'scanner',
    'read',
    'barcode',
    'client-side'
  ],
  component: lazy(() => import('./index'))
});
