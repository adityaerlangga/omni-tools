import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import RadioWithTextField from '@components/options/RadioWithTextField';
import SimpleRadio from '@components/options/SimpleRadio';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { updateNumberField } from '../../../../utils/string';
import { xmlToJson } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  indentationType: 'space',
  spacesCount: 2,
  ignoreAttributes: false
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Convert a simple XML document',
    description: 'Turn XML elements into a JSON object tree.',
    sampleText: '<root><name>Ada</name><age>36</age></root>',
    sampleResult: `{
  "root": {
    "name": "Ada",
    "age": 36
  }
}`,
    sampleOptions: { ...initialValues, ignoreAttributes: true }
  },
  {
    title: 'Preserve XML attributes',
    description: 'Attributes are mapped with an @_ prefix.',
    sampleText: '<user id="42"><name>Ada</name></user>',
    sampleResult: `{
  "user": {
    "@_id": "42",
    "name": "Ada"
  }
}`,
    sampleOptions: { ...initialValues, ignoreAttributes: false }
  }
];

export default function XmlToJson({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('xml');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(xmlToJson(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('xmlToJson.inputTitle')}
          value={input}
          onChange={setInput}
          language="xml"
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('xmlToJson.resultTitle')}
          value={result}
          extension="json"
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('xmlToJson.indentation'),
          component: (
            <Box>
              <RadioWithTextField
                checked={values.indentationType === 'space'}
                title={t('xmlToJson.useSpaces')}
                fieldName="indentationType"
                description={t('xmlToJson.useSpacesDescription')}
                value={values.spacesCount.toString()}
                onRadioClick={() => updateField('indentationType', 'space')}
                onTextChange={(val) =>
                  updateNumberField(val, 'spacesCount', updateField)
                }
              />
              <SimpleRadio
                onClick={() => updateField('indentationType', 'tab')}
                checked={values.indentationType === 'tab'}
                description={t('xmlToJson.useTabsDescription')}
                title={t('xmlToJson.useTabs')}
              />
            </Box>
          )
        },
        {
          title: t('xmlToJson.optionsTitle'),
          component: (
            <CheckboxWithDesc
              checked={!values.ignoreAttributes}
              onChange={(value) => updateField('ignoreAttributes', !value)}
              title={t('xmlToJson.includeAttributesTitle')}
              description={t('xmlToJson.includeAttributesDescription')}
            />
          )
        }
      ]}
      compute={compute}
      toolInfo={{
        title: t('xmlToJson.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
