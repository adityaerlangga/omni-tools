import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('xml', {
  path: 'xml-to-json',
  icon: 'mdi:code-json',
  keywords: ['xml', 'json', 'convert', 'parse', 'transform'],
  component: lazy(() => import('./index')),
  i18n: {
    name: 'xml:xmlToJson.title',
    description: 'xml:xmlToJson.description',
    shortDescription: 'xml:xmlToJson.shortDescription',
    longDescription: 'xml:xmlToJson.longDescription'
  }
});
