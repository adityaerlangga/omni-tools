import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('number', {
  path: 'chmod-calculator',
  icon: 'mdi:file-lock',
  keywords: [
    'chmod',
    'unix',
    'permissions',
    'octal',
    'symbolic',
    'rwx',
    'linux'
  ],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'number:chmodCalculator.title',
    description: 'number:chmodCalculator.description',
    shortDescription: 'number:chmodCalculator.shortDescription',
    userTypes: ['developers']
  }
});
