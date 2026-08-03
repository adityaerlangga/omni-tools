import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolTextResult from '@components/result/ToolTextResult';
import { ToolComponentProps } from '@tools/defineTool';
import { CustomSnackBarContext } from '../../../../../contexts/CustomSnackBarContext';
import { decodeQrFromFile } from './service';

const initialValues = {};

export default function QrDecoder({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = async (
    _options: typeof initialValues,
    inputFile: File | null
  ) => {
    if (!inputFile) return;
    setIsProcessing(true);
    try {
      const decoded = await decodeQrFromFile(inputFile);
      setResult(decoded.text);
      if (!decoded.success) {
        showSnackBar(t('qrDecoder.notFound'), 'error');
      }
    } catch (err) {
      console.error(err);
      showSnackBar(t('qrDecoder.error'), 'error');
      setResult('');
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
      inputComponent={
        <ToolImageInput
          value={input}
          onChange={setInput}
          accept={['image/*']}
          title={t('qrDecoder.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('qrDecoder.resultTitle')}
          value={result}
          loading={isProcessing}
        />
      }
      toolInfo={{
        title: t('qrDecoder.title'),
        description: t('qrDecoder.description')
      }}
    />
  );
}
