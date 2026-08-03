import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'contrast-checker',
  icon: 'mdi:contrast-circle',
  keywords: [
    'contrast',
    'wcag',
    'accessibility',
    'a11y',
    'color',
    'aa',
    'aaa'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:contrastChecker.title',
    description: 'number:contrastChecker.description',
    shortDescription: 'number:contrastChecker.shortDescription',
    userTypes: ['generalUsers', 'developers']
  }
});
