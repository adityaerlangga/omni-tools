import React, { useState } from 'react';
import { Box } from '@mui/material';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import SelectWithDesc from '@components/options/SelectWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { CardExampleType } from '@components/examples/ToolExamples';
import { useTranslation } from 'react-i18next';
import { generateLorem } from './service';
import { InitialValuesType, LoremType } from './types';

const initialValues: InitialValuesType = {
  type: 'paragraphs',
  count: '2'
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Two paragraphs',
    description: 'Generate classic multi-paragraph placeholder copy.',
    sampleText: '',
    sampleResult: 'Lorem ipsum dolor sit amet...',
    sampleOptions: { type: 'paragraphs', count: '2' }
  },
  {
    title: 'Five sentences',
    description: 'Produce a short block of sentences.',
    sampleText: '',
    sampleResult: 'Lorem ipsum dolor sit amet. ...',
    sampleOptions: { type: 'sentences', count: '5' }
  },
  {
    title: 'Ten words',
    description: 'Emit a simple word list for tight layouts.',
    sampleText: '',
    sampleResult:
      'lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
    sampleOptions: { type: 'words', count: '10' }
  }
];

export default function LoremIpsum({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    setResult(generateLorem(values));
  };

  const typeOptions: { label: string; value: LoremType }[] = [
    { label: t('loremIpsum.types.paragraphs'), value: 'paragraphs' },
    { label: t('loremIpsum.types.sentences'), value: 'sentences' },
    { label: t('loremIpsum.types.words'), value: 'words' }
  ];

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('loremIpsum.optionsTitle'),
      component: (
        <Box>
          <SelectWithDesc
            selected={values.type}
            options={typeOptions}
            onChange={(value) => updateField('type', value)}
            description={t('loremIpsum.typeDescription')}
          />
          <TextFieldWithDesc
            description={t('loremIpsum.countDescription')}
            value={values.count}
            onOwnChange={(val) => updateField('count', val)}
            type="number"
            inputProps={{ min: 1, max: 500 }}
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
        <ToolTextResult value={result} title={t('loremIpsum.resultTitle')} />
      }
      exampleCards={exampleCards}
      toolInfo={{
        title: t('loremIpsum.toolInfo.title'),
        description: longDescription
      }}
    />
  );
}
