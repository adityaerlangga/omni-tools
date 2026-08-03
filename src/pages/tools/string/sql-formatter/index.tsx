import { Box } from '@mui/material';
import React, { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolCodeInput from '@components/input/ToolCodeInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { CardExampleType } from '@components/examples/ToolExamples';
import SelectWithDesc from '@components/options/SelectWithDesc';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { updateNumberField } from '../../../../utils/string';
import { formatSql } from './service';
import { InitialValuesType, SqlDialect } from './types';
import { useTranslation } from 'react-i18next';

const initialValues: InitialValuesType = {
  language: 'sql',
  tabWidth: 2,
  useTabs: false,
  keywordCase: 'upper'
};

const dialectOptions: { label: string; value: SqlDialect }[] = [
  { label: 'Standard SQL', value: 'sql' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'PostgreSQL', value: 'postgresql' },
  { label: 'SQLite', value: 'sqlite' },
  { label: 'MariaDB', value: 'mariadb' },
  { label: 'T-SQL', value: 'tsql' },
  { label: 'PL/SQL', value: 'plsql' },
  { label: 'BigQuery', value: 'bigquery' }
];

const exampleCards: CardExampleType<InitialValuesType>[] = [
  {
    title: 'Beautify a compact query',
    description: 'Format a one-line SELECT into a readable multi-line query.',
    sampleText: 'select id, name from users where active = 1 order by name',
    sampleResult:
      'SELECT\n  id,\n  name\nFROM\n  users\nWHERE\n  active = 1\nORDER BY\n  name',
    sampleOptions: { ...initialValues }
  }
];

export default function SqlFormatter({
  title,
  longDescription
}: ToolComponentProps) {
  const { t } = useTranslation('string');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType, inputText: string) => {
    setResult(formatSql(inputText, values));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolCodeInput
          title={t('sqlFormatter.inputTitle')}
          value={input}
          onChange={setInput}
          language="sql"
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('sqlFormatter.resultTitle')}
          value={result}
          extension="sql"
        />
      }
      initialValues={initialValues}
      exampleCards={exampleCards}
      getGroups={({ values, updateField }) => [
        {
          title: t('sqlFormatter.optionsTitle'),
          component: (
            <Box>
              <SelectWithDesc
                selected={values.language}
                options={dialectOptions}
                onChange={(value) => updateField('language', value)}
                description={t('sqlFormatter.languageDescription')}
              />
              <TextFieldWithDesc
                description={t('sqlFormatter.tabWidthDescription')}
                value={values.tabWidth.toString()}
                onOwnChange={(val) =>
                  updateNumberField(val, 'tabWidth', updateField)
                }
                type="number"
              />
              <CheckboxWithDesc
                checked={values.useTabs}
                onChange={(value) => updateField('useTabs', value)}
                title={t('sqlFormatter.useTabsTitle')}
                description={t('sqlFormatter.useTabsDescription')}
              />
              <SelectWithDesc
                selected={values.keywordCase}
                options={[
                  { label: 'Uppercase', value: 'upper' },
                  { label: 'Lowercase', value: 'lower' },
                  { label: 'Preserve', value: 'preserve' }
                ]}
                onChange={(value) => updateField('keywordCase', value)}
                description={t('sqlFormatter.keywordCaseDescription')}
              />
            </Box>
          )
        }
      ]}
      compute={compute}
      toolInfo={{
        title: t('sqlFormatter.toolInfo.title', { title }),
        description: longDescription
      }}
    />
  );
}
