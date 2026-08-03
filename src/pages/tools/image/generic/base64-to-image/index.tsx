import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolContent from '@components/ToolContent';
import ToolTextInput from '@components/input/ToolTextInput';
import ToolFileResult from '@components/result/ToolFileResult';
import { ToolComponentProps } from '@tools/defineTool';
import { CustomSnackBarContext } from '../../../../../contexts/CustomSnackBarContext';
import { base64ToImageFile } from './service';

const initialValues = {};

export default function Base64ToImage({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = (_options: typeof initialValues, inputText: string) => {
    if (!inputText?.trim()) {
      setResult(null);
      return;
    }
    setIsProcessing(true);
    try {
      const file = base64ToImageFile(inputText);
      setResult(file);
    } catch (err) {
      console.error(err);
      showSnackBar(t('base64ToImage.error'), 'error');
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolContent
      title={title}
      initialValues={initialValues}
      getGroups={null}
      compute={compute}
      input={input}
      setInput={setInput}
      inputComponent={
        <ToolTextInput
          value={input}
          onChange={setInput}
          title={t('base64ToImage.inputTitle')}
        />
      }
      resultComponent={
        <ToolFileResult
          title={t('base64ToImage.resultTitle')}
          value={result}
          extension={result?.name.split('.').pop() || 'png'}
          loading={isProcessing}
        />
      }
      toolInfo={{
        title: t('base64ToImage.title'),
        description: t('base64ToImage.description')
      }}
    />
  );
}
