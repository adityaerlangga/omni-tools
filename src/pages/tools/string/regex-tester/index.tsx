import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { testRegex } from './service';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  pattern: '\\w+',
  flagG: true,
  flagI: false,
  flagM: false,
  replacement: '',
  showReplacement: false
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Find all words',
    description: 'Match every word token with the global flag.',
    sampleText: 'Hello world 123',
    sampleResult:
      'Matches: 3\n1. "Hello" at index 0\n2. "world" at index 6\n3. "123" at index 12',
    sampleOptions: {
      pattern: '\\w+',
      flagG: true,
      flagI: false,
      flagM: false,
      replacement: '',
      showReplacement: false
    }
  },
  {
    title: 'Case-insensitive emails',
    description: 'Find email-like patterns ignoring case.',
    sampleText: 'Contact A@B.COM or c@d.org',
    sampleResult: 'Matches: 2',
    sampleOptions: {
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}',
      flagG: true,
      flagI: true,
      flagM: false,
      replacement: '',
      showReplacement: false
    }
  },
  {
    title: 'Replace digits',
    description: 'Show the replacement result alongside matches.',
    sampleText: 'Order 12 and 34',
    sampleResult:
      'Matches: 2\n1. "12" at index 6\n2. "34" at index 13\n\nReplacement result:\nOrder # and #',
    sampleOptions: {
      pattern: '\\d+',
      flagG: true,
      flagI: false,
      flagM: false,
      replacement: '#',
      showReplacement: true
    }
  }
];

export default function RegexTester({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(testRegex(inputText, values));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('regexTester.optionsTitle'),
      component: (
        <Box>
          <TextFieldWithDesc
            description={t('regexTester.patternDescription')}
            value={values.pattern}
            onOwnChange={(val) => updateField('pattern', val)}
            placeholder={t('regexTester.patternPlaceholder')}
          />
          <CheckboxWithDesc
            checked={values.flagG}
            title={t('regexTester.flagG')}
            description={t('regexTester.flagGDescription')}
            onChange={(val) => updateField('flagG', val)}
          />
          <CheckboxWithDesc
            checked={values.flagI}
            title={t('regexTester.flagI')}
            description={t('regexTester.flagIDescription')}
            onChange={(val) => updateField('flagI', val)}
          />
          <CheckboxWithDesc
            checked={values.flagM}
            title={t('regexTester.flagM')}
            description={t('regexTester.flagMDescription')}
            onChange={(val) => updateField('flagM', val)}
          />
          <CheckboxWithDesc
            checked={values.showReplacement}
            title={t('regexTester.showReplacement')}
            description={t('regexTester.showReplacementDescription')}
            onChange={(val) => updateField('showReplacement', val)}
          />
          <TextFieldWithDesc
            description={t('regexTester.replacementDescription')}
            value={values.replacement}
            onOwnChange={(val) => updateField('replacement', val)}
            placeholder={t('regexTester.replacementPlaceholder')}
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
          title={t('regexTester.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult value={result} title={t('regexTester.resultTitle')} />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={getGroups}
      setInput={setInput}
      compute={compute}
      toolInfo={{
        title: t('regexTester.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
