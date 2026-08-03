import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:passwordStrength.title',
    description: 'string:passwordStrength.description',
    shortDescription: 'string:passwordStrength.shortDescription',
    longDescription: 'string:passwordStrength.longDescription',
    userTypes: ['developers', 'generalUsers']
  },
  path: 'password-strength',
  icon: 'mdi:shield-check',
  keywords: ['password', 'strength', 'security', 'score', 'checker', 'analyze'],
  component: lazy(() => import('./index'))
});
