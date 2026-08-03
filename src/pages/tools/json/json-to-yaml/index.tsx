import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { updateNumberField } from '../../../../utils/string';
import { jsonToYaml } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  indent: 2
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Convert a JSON object',
    description: 'Serialize a JSON object into readable YAML.',
    sampleText: '{\n  "name": "Ada",\n  "age": 36\n}',
    sampleResult: 'name: Ada\nage: 36',
    sampleOptions: { ...initialValues }
  },
  {
    title: 'Convert nested JSON',
    description: 'Nested objects and arrays become YAML maps and lists.',
    sampleText:
      '{\n  "user": {\n    "name": "Ada",\n    "hobbies": ["math", "code"]\n  }\n}',
    sampleResult: 'user:\n  name: Ada\n  hobbies:\n    - math\n    - code',
    sampleOptions: { ...initialValues }
  }
];

export default function JsonToYaml({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(jsonToYaml(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('jsonToYaml.inputTitle')}
          value={input}
          onChange={setInput}
          language="json"
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('jsonToYaml.resultTitle')}
          value={result}
          extension="yaml"
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('jsonToYaml.optionsTitle'),
          component: (
            <TextFieldWithDesc
              description={t('jsonToYaml.indentDescription')}
              value={values.indent.toString()}
              onOwnChange={(val) =>
                updateNumberField(val, 'indent', updateField)
              }
              type="number"
            />
          )
        }
      ]}
      compute={compute}
      toolInfo={{
        title: t('jsonToYaml.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
