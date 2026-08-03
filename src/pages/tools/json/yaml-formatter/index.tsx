import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { updateNumberField } from '../../../../utils/string';
import { formatYaml } from './service';
import { InitialValuesType } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  indent: 2,
  sortKeys: false
};

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Beautify compact YAML',
    description: 'Expand inline collections into a readable block style.',
    sampleText: 'name: Ada\nhobbies: [math, code]',
    sampleResult: 'name: Ada\nhobbies:\n  - math\n  - code',
    sampleOptions: { ...initialValues }
  },
  {
    title: 'Sort keys alphabetically',
    description: 'Normalize key order while formatting.',
    sampleText: 'z: 1\na: 2\nm: 3',
    sampleResult: 'a: 2\nm: 3\nz: 1',
    sampleOptions: { indent: 2, sortKeys: true }
  }
];

export default function YamlFormatter({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('json');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(formatYaml(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('yamlFormatter.inputTitle')}
          value={input}
          onChange={setInput}
          language="yaml"
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('yamlFormatter.resultTitle')}
          value={result}
          extension="yaml"
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('yamlFormatter.optionsTitle'),
          component: (
            <Box>
              <TextFieldWithDesc
                description={t('yamlFormatter.indentDescription')}
                value={values.indent.toString()}
                onOwnChange={(val) =>
                  updateNumberField(val, 'indent', updateField)
                }
                type="number"
              />
              <CheckboxWithDesc
                checked={values.sortKeys}
                onChange={(value) => updateField('sortKeys', value)}
                title={t('yamlFormatter.sortKeysTitle')}
                description={t('yamlFormatter.sortKeysDescription')}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
      toolInfo={{
        title: t('yamlFormatter.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
