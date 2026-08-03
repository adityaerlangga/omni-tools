import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { generateIds } from './service';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  count: '1',
  includeNanoId: false
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Single UUID v4',
    description: 'Generate one random UUID version 4.',
    sampleText: '',
    sampleResult: '550e8400-e29b-41d4-a716-446655440000',
    sampleOptions: { count: '1', includeNanoId: false }
  },
  {
    title: 'Batch of UUIDs',
    description: 'Generate five UUIDs at once, one per line.',
    sampleText: '',
    sampleResult:
      '550e8400-e29b-41d4-a716-446655440000\n6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    sampleOptions: { count: '5', includeNanoId: false }
  },
  {
    title: 'UUID + NanoID',
    description: 'Also emit a NanoID-style random ID next to each UUID.',
    sampleText: '',
    sampleResult: '550e8400-e29b-41d4-a716-446655440000\tV1StGXR8_Z5jdHi6B-myT',
    sampleOptions: { count: '1', includeNanoId: true }
  }
];

export default function UuidGenerator({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    setResult(generateIds(values));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('uuidGenerator.optionsTitle'),
      component: (
        <Box>
          <TextFieldWithDesc
            description={t('uuidGenerator.countDescription')}
            value={values.count}
            onOwnChange={(val) => updateField('count', val)}
            type="number"
            inputProps={{ min: 1, max: 100 }}
          />
          <CheckboxWithDesc
            checked={values.includeNanoId}
            title={t('uuidGenerator.includeNanoId')}
            description={t('uuidGenerator.includeNanoIdDescription')}
            onChange={(val) => updateField('includeNanoId', val)}
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      resultComponent={
        <ToolTextResult title={t('uuidGenerator.resultTitle')} value={result} />
      }
      exampleCards={exampleCards}
      toolInfo={{
        title: t('uuidGenerator.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
