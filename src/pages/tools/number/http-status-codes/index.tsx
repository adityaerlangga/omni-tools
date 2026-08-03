import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { filterHttpStatusCodes, formatHttpStatusCodes } from './service';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  query: ''
};

export default function HttpStatusCodes({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>(
    formatHttpStatusCodes(filterHttpStatusCodes(''))
  );

  const compute = (_values: InitialValuesType, inputValue: string) => {
    setResult(formatHttpStatusCodes(filterHttpStatusCodes(inputValue)));
  };

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          title={t('httpStatusCodes.inputTitle')}
          value={input}
          onChange={setInput}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('httpStatusCodes.resultTitle')}
          value={result}
        />
      }
      initialValues={initialValues}
      getGroups={null}
      compute={compute}
      toolInfo={{
        title: t('httpStatusCodes.toolInfo.title'),
        description: t('httpStatusCodes.toolInfo.description')
      }}
    />
  );
}
