import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import SimpleRadio from '@components/options/SimpleRadio';
import { convertColor, formatColorResult } from './service';
import { useTranslation } from 'react-i18next';
import { ColorConversionResult, InitialValuesType } from './types';
import { ContentCard } from '@components/ui/ContentCard';

const initialValues: InitialValuesType = {
  hex: '#0082C9',
  r: 0,
  g: 130,
  b: 201,
  h: 201,
  s: 100,
  l: 39,
  source: 'hex'
};

export default function ColorConverter({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [resultText, setResultText] = useState<string>('');
  const [color, setColor] = useState<ColorConversionResult | null>(null);

  const compute = (values: InitialValuesType) => {
    const converted = convertColor(values);
    setColor(converted);
    setResultText(formatColorResult(converted));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('colorConverter.sourceTitle'),
      component: (
        <Box>
          <SimpleRadio
            onClick={() => updateField('source', 'hex')}
            checked={values.source === 'hex'}
            title={t('colorConverter.sourceHex')}
          />
          <SimpleRadio
            onClick={() => updateField('source', 'rgb')}
            checked={values.source === 'rgb'}
            title={t('colorConverter.sourceRgb')}
          />
          <SimpleRadio
            onClick={() => updateField('source', 'hsl')}
            checked={values.source === 'hsl'}
            title={t('colorConverter.sourceHsl')}
          />
        </Box>
      )
    },
    {
      title: t('colorConverter.valuesTitle'),
      component: (
        <Box>
          {values.source === 'hex' && (
            <TextFieldWithDesc
              value={values.hex}
              onOwnChange={(val) => updateField('hex', val)}
              description={t('colorConverter.hexDescription')}
              placeholder="#0082C9"
            />
          )}
          {values.source === 'rgb' && (
            <>
              <TextFieldWithDesc
                type="number"
                value={values.r}
                onOwnChange={(val) => updateField('r', Number(val))}
                description="R (0–255)"
              />
              <TextFieldWithDesc
                type="number"
                value={values.g}
                onOwnChange={(val) => updateField('g', Number(val))}
                description="G (0–255)"
              />
              <TextFieldWithDesc
                type="number"
                value={values.b}
                onOwnChange={(val) => updateField('b', Number(val))}
                description="B (0–255)"
              />
            </>
          )}
          {values.source === 'hsl' && (
            <>
              <TextFieldWithDesc
                type="number"
                value={values.h}
                onOwnChange={(val) => updateField('h', Number(val))}
                description="H (0–360)"
              />
              <TextFieldWithDesc
                type="number"
                value={values.s}
                onOwnChange={(val) => updateField('s', Number(val))}
                description="S (0–100)"
              />
              <TextFieldWithDesc
                type="number"
                value={values.l}
                onOwnChange={(val) => updateField('l', Number(val))}
                description="L (0–100)"
              />
            </>
          )}
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      inputComponent={
        <ContentCard sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            {t('colorConverter.previewTitle')}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 180,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              bgcolor: color?.hex ?? 'transparent',
              backgroundImage:
                color == null
                  ? 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 16px 16px'
                  : undefined
            }}
          />
          {color && (
            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
              {color.hex}
            </Typography>
          )}
        </ContentCard>
      }
      resultComponent={
        <ToolTextResult
          title={t('colorConverter.resultTitle')}
          value={resultText}
        />
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('colorConverter.toolInfo.title'),
        description: t('colorConverter.toolInfo.description')
      }}
    />
  );
}
