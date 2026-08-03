import { Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import InputHeader from '@components/InputHeader';
import { CardExampleType } from '@components/examples/ToolExamples';
import { ContentCard } from '@components/ui/ContentCard';
import { globalInputHeight } from '../../../../config/uiConfig';
import { renderMarkdown } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Preview headings and emphasis',
    description: 'Render common Markdown syntax as sanitized HTML.',
    sampleText: '# Hello\n\nThis is **bold** and *italic*.',
    sampleResult:
      '<h1>Hello</h1>\n<p>This is <strong>bold</strong> and <em>italic</em>.</p>',
    sampleOptions: {}
  },
  {
    title: 'Preview a list',
    description: 'Lists and links are rendered in the preview pane.',
    sampleText: '- One\n- Two\n- [Docs](https://example.com)',
    sampleResult:
      '<ul>\n<li>One</li>\n<li>Two</li>\n<li><a href="https://example.com">Docs</a></li>\n</ul>',
    sampleOptions: {}
  }
];

export default function MarkdownPreview({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const theme = useTheme();
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(renderMarkdown(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('markdownPreview.inputTitle')}
          value={input}
          onChange={setInput}
          language="markdown"
        />
      }
      resultComponent={
        <Box>
          <InputHeader title={t('markdownPreview.resultTitle')} />
          <ContentCard
            sx={{
              height: globalInputHeight,
              overflow: 'auto',
              px: 2,
              py: 1.5,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'background.default'
                  : 'background.paper',
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 1.5,
                mb: 1,
                fontWeight: 600
              },
              '& p, & ul, & ol': { mb: 1.25 },
              '& pre': {
                p: 1.5,
                overflow: 'auto',
                borderRadius: 1,
                bgcolor: 'action.hover'
              },
              '& code': {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: '0.875em'
              },
              '& a': { color: 'primary.main' },
              '& blockquote': {
                borderLeft: '3px solid',
                borderColor: 'divider',
                pl: 1.5,
                color: 'text.secondary',
                m: 0
              }
            }}
          >
            {result ? (
              <Box dangerouslySetInnerHTML={{ __html: result }} />
            ) : (
              <Box sx={{ color: 'text.secondary', fontSize: 14 }}>
                {t('markdownPreview.emptyPreview')}
              </Box>
            )}
          </ContentCard>
        </Box>
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={null}
      compute={compute}
      toolInfo={{
        title: t('markdownPreview.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
