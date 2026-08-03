import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'color-converter',
  icon: 'mdi:palette',
  keywords: ['color', 'converter', 'hex', 'rgb', 'hsl', 'swatch'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:colorConverter.title',
    description: 'number:colorConverter.description',
    shortDescription: 'number:colorConverter.shortDescription',
    userTypes: ['generalUsers', 'developers']
  }
});
