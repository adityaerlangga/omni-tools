import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { formatReport } from './service';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Weak password',
    description: 'A short common password scores poorly.',
    sampleText: 'password',
    sampleResult: 'Score: 0/4 (Very weak)',
    sampleOptions: {}
  },
  {
    title: 'Fair password',
    description: 'Mixed character types improve the score.',
    sampleText: 'Cat7!moon',
    sampleResult: 'Score: 2/4 (Fair)',
    sampleOptions: {}
  },
  {
    title: 'Strong passphrase',
    description: 'Long diverse passwords score highest.',
    sampleText: 'Tr0ub4dor&3-Extra!',
    sampleResult: 'Score: 4/4 (Very strong)',
    sampleOptions: {}
  }
];

export default function PasswordStrength({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (_values: InitialValuesType, inputText: string) => {
    setResult(formatReport(inputText));
  };

  const getGroups: GetGroupsType<InitialValuesType> | null = null;

  return (
    <ToolContent
      title={title}
      input={input}
      inputComponent={
        <ToolTextInput
          value={input}
          onChange={setInput}
          title={t('passwordStrength.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult
          value={result}
          title={t('passwordStrength.resultTitle')}
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('passwordStrength.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
