import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { updateNumberField } from '../../../../utils/string';
import { generateFakeJson } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  count: 1,
  seed: ''
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'One sample person',
    description: 'Generate a single nested fake JSON object.',
    sampleText: '',
    sampleResult: '{\n  "id": 123456,\n  "name": "Ada Lovelace",\n  ...\n}',
    sampleOptions: { count: 1, seed: 'demo' }
  },
  {
    title: 'Multiple records',
    description: 'Generate an array of fake JSON objects with a fixed seed.',
    sampleText: '',
    sampleResult: '[\n  { "id": 1, ... },\n  { "id": 2, ... }\n]',
    sampleOptions: { count: 3, seed: 'batch' }
  }
];

export default function FakeJson({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    setResult(generateFakeJson(values));
  };

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('fakeJson.optionsTitle'),
          component: (
            <Box>
              <TextFieldWithDesc
                description={t('fakeJson.countDescription')}
                value={values.count.toString()}
                onOwnChange={(val) =>
                  updateNumberField(val, 'count', updateField)
                }
                type="number"
              />
              <TextFieldWithDesc
                description={t('fakeJson.seedDescription')}
                value={values.seed}
                onOwnChange={(val) => updateField('seed', val)}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
      resultComponent={
        <ToolTextResult
          title={t('fakeJson.resultTitle')}
          value={result}
          extension="json"
        />
      }
      toolInfo={{
        title: t('fakeJson.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
