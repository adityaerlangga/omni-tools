import { Box, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import ColorSelector from '@components/options/ColorSelector';
import { checkContrast, formatContrastResult } from './service';
import { useTranslation } from 'react-i18next';
import { ContrastResult, InitialValuesType } from './types';
import { ContentCard } from '@components/ui/ContentCard';

const initialValues: InitialValuesType = {
  foreground: '#000000',
  background: '#FFFFFF'
};

export default function ContrastChecker({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [resultText, setResultText] = useState<string>('');
  const [contrast, setContrast] = useState<ContrastResult | null>(null);
  const [preview, setPreview] = useState(initialValues);

  const compute = (values: InitialValuesType) => {
    setPreview(values);
    const result = checkContrast(values);
    setContrast(result);
    setResultText(formatContrastResult(result));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('contrastChecker.colorsTitle'),
      component: (
        <Box>
          <ColorSelector
            value={values.foreground}
            onColorChange={(val) => updateField('foreground', val)}
            description={t('contrastChecker.foregroundDescription')}
          />
          <TextFieldWithDesc
            value={values.foreground}
            onOwnChange={(val) => updateField('foreground', val)}
            description={t('contrastChecker.foregroundHex')}
            placeholder="#000000"
          />
          <ColorSelector
            value={values.background}
            onColorChange={(val) => updateField('background', val)}
            description={t('contrastChecker.backgroundDescription')}
          />
          <TextFieldWithDesc
            value={values.background}
            onOwnChange={(val) => updateField('background', val)}
            description={t('contrastChecker.backgroundHex')}
            placeholder="#FFFFFF"
          />
        </Box>
      )
    }
  ];

  const statusChip = (label: string, pass: boolean) => (
    <Chip
      size="small"
      label={`${label}: ${pass ? 'Pass' : 'Fail'}`}
      color={pass ? 'success' : 'error'}
      variant="outlined"
      sx={{ mr: 1, mb: 1 }}
    />
  );

  return (
    <ToolContent
      title={title}
      inputComponent={
        <ContentCard sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            {t('contrastChecker.previewTitle')}
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: 1,
              bgcolor: preview.background,
              color: preview.foreground,
              border: 1,
              borderColor: 'divider',
              minHeight: 140
            }}
          >
            <Typography variant="h5" sx={{ color: 'inherit' }}>
              {t('contrastChecker.sampleLarge')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'inherit', mt: 1 }}>
              {t('contrastChecker.sampleNormal')}
            </Typography>
          </Box>
          {contrast && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">{contrast.ratioLabel}</Typography>
              {statusChip('AA', contrast.aaNormal)}
              {statusChip('AA Large', contrast.aaLarge)}
              {statusChip('AAA', contrast.aaaNormal)}
              {statusChip('AAA Large', contrast.aaaLarge)}
            </Box>
          )}
        </ContentCard>
      }
      resultComponent={
        <ToolTextResult
          title={t('contrastChecker.resultTitle')}
          value={resultText}
        />
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('contrastChecker.toolInfo.title'),
        description: t('contrastChecker.toolInfo.description')
      }}
    />
  );
}
