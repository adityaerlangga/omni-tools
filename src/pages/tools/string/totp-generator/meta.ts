import { defineTool } from '@tools/defineTool';
import { lazy } from 'react';

export const tool = defineTool('string', {
  i18n: {
    name: 'string:totpGenerator.title',
    description: 'string:totpGenerator.description',
    shortDescription: 'string:totpGenerator.shortDescription',
    longDescription: 'string:totpGenerator.longDescription',
    userTypes: ['developers']
  },
  path: 'totp-generator',
  icon: 'mdi:two-factor-authentication',
  keywords: ['totp', 'otp', '2fa', 'mfa', 'authenticator', 'hmac', 'hotp'],
  component: lazy(() => import('./index'))
});
