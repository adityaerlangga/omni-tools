import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import SelectWithDesc from '@components/options/SelectWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { convertText } from './service';
import { CaseType, InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  targetCase: 'camel'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'To camelCase',
    description: 'Convert a phrase into camelCase.',
    sampleText: 'hello world example',
    sampleResult: 'helloWorldExample',
    sampleOptions: { targetCase: 'camel' }
  },
  {
    title: 'To snake_case',
    description: 'Convert camelCase identifiers to snake_case.',
    sampleText: 'getUserName',
    sampleResult: 'get_user_name',
    sampleOptions: { targetCase: 'snake' }
  },
  {
    title: 'To CONSTANT_CASE',
    description: 'Convert to uppercase snake case for constants.',
    sampleText: 'api-base-url',
    sampleResult: 'API_BASE_URL',
    sampleOptions: { targetCase: 'constant' }
  }
];

export default function CaseConverter({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(convertText(inputText, values));
  };

  const caseOptions: { label: string; value: CaseType }[] = [
    { label: t('caseConverter.cases.lowercase'), value: 'lowercase' },
    { label: t('caseConverter.cases.uppercase'), value: 'uppercase' },
    { label: t('caseConverter.cases.title'), value: 'title' },
    { label: t('caseConverter.cases.camel'), value: 'camel' },
    { label: t('caseConverter.cases.pascal'), value: 'pascal' },
    { label: t('caseConverter.cases.snake'), value: 'snake' },
    { label: t('caseConverter.cases.kebab'), value: 'kebab' },
    { label: t('caseConverter.cases.constant'), value: 'constant' }
  ];

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('caseConverter.optionsTitle'),
      component: (
        <Box>
          <SelectWithDesc
            selected={values.targetCase}
            options={caseOptions}
            onChange={(value) => updateField('targetCase', value)}
            description={t('caseConverter.targetCaseDescription')}
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      input={input}
      inputComponent={
        <ToolTextInput
          value={input}
          onChange={setInput}
          title={t('caseConverter.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult value={result} title={t('caseConverter.resultTitle')} />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('caseConverter.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
