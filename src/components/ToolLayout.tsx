import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import ToolHeader from './ToolHeader';
import { getI18nNamespaceFromToolCategory } from '../utils/string';
import { IconifyIcon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { ToolCategory } from '@tools/defineTool';
import { FullI18nKey } from '../i18n';

export default function ToolLayout({
  children,
  icon,
  i18n,
  type,
  fullPath
}: {
  icon?: IconifyIcon | string;
  type: ToolCategory;
  fullPath: string;
  children: ReactNode;
  i18n?: {
    name: FullI18nKey;
    description: FullI18nKey;
    shortDescription: FullI18nKey;
  };
}) {
  const { t } = useTranslation([
    'translation',
    getI18nNamespaceFromToolCategory(type)
  ]);

  //@ts-ignore
  const toolTitle: string = t(i18n.name);
  //@ts-ignore
  const toolDescription: string = t(i18n.description);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: 'background.default' }}
    >
      <Helmet>
        <title>{`${toolTitle} - Universal Tools`}</title>
      </Helmet>
      <Box
        px={{ xs: 2, md: 3 }}
        py={{ xs: 2, md: 3 }}
        maxWidth={1100}
        width="100%"
        mx="auto"
      >
        <ToolHeader
          title={toolTitle}
          description={toolDescription}
          icon={icon}
          type={type}
          path={fullPath}
        />
        {children}
      </Box>
    </Box>
  );
}
