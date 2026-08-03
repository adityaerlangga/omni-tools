import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:uuidGenerator.title',
    description: 'string:uuidGenerator.description',
    shortDescription: 'string:uuidGenerator.shortDescription',
    longDescription: 'string:uuidGenerator.longDescription',
    userTypes: ['developers', 'generalUsers']
  },
  path: 'uuid-generator',
  icon: 'mdi:identifier',
  keywords: ['uuid', 'guid', 'generator', 'nanoid', 'id', 'unique'],
  component: lazy(() => import('./index'))
});
