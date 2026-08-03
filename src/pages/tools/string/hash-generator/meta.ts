import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:hashGenerator.title',
    description: 'string:hashGenerator.description',
    shortDescription: 'string:hashGenerator.shortDescription',
    longDescription: 'string:hashGenerator.longDescription',
    userTypes: ['developers', 'generalUsers']
  },
  path: 'hash-generator',
  icon: 'mdi:pound-box',
  keywords: ['hash', 'sha256', 'sha512', 'sha1', 'md5', 'checksum', 'digest'],
  component: lazy(() => import('./index'))
});
