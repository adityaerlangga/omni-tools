import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import RadioWithTextField from '@components/options/RadioWithTextField';
import SimpleRadio from '@components/options/SimpleRadio';
import { updateNumberField } from '../../../../utils/string';
import { yamlToJson } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  indentationType: 'space',
  spacesCount: 2
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Convert a simple YAML object',
    description: 'Turn a YAML mapping into pretty-printed JSON.',
    sampleText: 'name: Ada\nage: 36\nactive: true',
    sampleResult: `{
  "name": "Ada",
  "age": 36,
  "active": true
}`,
    sampleOptions: { ...initialValues }
  },
  {
    title: 'Convert nested YAML',
    description: 'Lists and nested maps become JSON arrays and objects.',
    sampleText: 'user:\n  name: Ada\n  hobbies:\n    - math\n    - code',
    sampleResult: `{
  "user": {
    "name": "Ada",
    "hobbies": [
      "math",
      "code"
    ]
  }
}`,
    sampleOptions: { ...initialValues }
  }
];

export default function YamlToJson({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(yamlToJson(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('yamlToJson.inputTitle')}
          value={input}
          onChange={setInput}
          language="yaml"
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('yamlToJson.resultTitle')}
          value={result}
          extension="json"
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('yamlToJson.indentation'),
          component: (
            <Box>
              <RadioWithTextField
                checked={values.indentationType === 'space'}
                title={t('yamlToJson.useSpaces')}
                fieldName="indentationType"
                description={t('yamlToJson.useSpacesDescription')}
                value={values.spacesCount.toString()}
                onRadioClick={() => updateField('indentationType', 'space')}
                onTextChange={(val) =>
                  updateNumberField(val, 'spacesCount', updateField)
                }
              />
              <SimpleRadio
                onClick={() => updateField('indentationType', 'tab')}
                checked={values.indentationType === 'tab'}
                description={t('yamlToJson.useTabsDescription')}
                title={t('yamlToJson.useTabs')}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
      toolInfo={{
        title: t('yamlToJson.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
