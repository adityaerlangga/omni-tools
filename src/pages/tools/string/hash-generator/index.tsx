import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import SelectWithDesc from '@components/options/SelectWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { hashText } from './service';
import { HashAlgorithm, InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  algorithm: 'SHA-256',
  uppercase: false
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'SHA-256 of hello',
    description: 'Compute the SHA-256 digest of a short string.',
    sampleText: 'hello',
    sampleResult:
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    sampleOptions: { algorithm: 'SHA-256', uppercase: false }
  },
  {
    title: 'MD5 checksum',
    description: 'Generate an MD5 hash locally in the browser.',
    sampleText: 'hello',
    sampleResult: '5d41402abc4b2a76b9719d911017c592',
    sampleOptions: { algorithm: 'MD5', uppercase: false }
  },
  {
    title: 'Uppercase SHA-1',
    description: 'Emit the digest in uppercase hexadecimal.',
    sampleText: 'hello',
    sampleResult: 'AAF4C61DDCC5E8A2DABEDE0F3B482CD9AEA9434D',
    sampleOptions: { algorithm: 'SHA-1', uppercase: true }
  }
];

export default function HashGenerator({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    void hashText(inputText, values).then(setResult);
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('hashGenerator.optionsTitle'),
      component: (
        <Box>
          <SelectWithDesc
            selected={values.algorithm}
            options={(
              ['SHA-256', 'SHA-512', 'SHA-1', 'MD5'] as HashAlgorithm[]
            ).map((alg) => ({
              label: alg,
              value: alg
            }))}
            onChange={(value) => updateField('algorithm', value)}
            description={t('hashGenerator.algorithmDescription')}
          />
          <CheckboxWithDesc
            checked={values.uppercase}
            title={t('hashGenerator.uppercase')}
            description={t('hashGenerator.uppercaseDescription')}
            onChange={(val) => updateField('uppercase', val)}
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
          title={t('hashGenerator.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult value={result} title={t('hashGenerator.resultTitle')} />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('hashGenerator.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
