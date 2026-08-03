import { Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolTextResult from '@components/result/ToolTextResult';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { ToolComponentProps } from '@tools/defineTool';
import { CustomSnackBarContext } from '../../../../../contexts/CustomSnackBarContext';
import { imageToBase64, ImageToBase64Options } from './service';

const initialValues: ImageToBase64Options = {
  includeDataUrlPrefix: true
};

export default function ImageToBase64({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = async (
    options: ImageToBase64Options,
    inputFile: File | null
  ) => {
    if (!inputFile) return;
    setIsProcessing(true);
    try {
      const output = await imageToBase64(inputFile, options);
      setResult(output);
    } catch (err) {
      console.error(err);
      showSnackBar(t('imageToBase64.error'), 'error');
      setResult('');
    } finally {
      setIsProcessing(false);
    }
  };

  const getGroups: GetGroupsType<ImageToBase64Options> = ({
    values,
    updateField
  }) => [
    {
      title: t('imageToBase64.optionsTitle'),
      component: (
        <Box>
          <CheckboxWithDesc
            checked={values.includeDataUrlPrefix}
            onChange={(value) => updateField('includeDataUrlPrefix', value)}
            title={t('imageToBase64.includeDataUrlPrefix')}
            description={t('imageToBase64.includeDataUrlPrefixDescription')}
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
      input={input}
      inputComponent={
        <ToolImageInput
          value={input}
          onChange={setInput}
          accept={['image/*']}
          title={t('imageToBase64.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('imageToBase64.resultTitle')}
          value={result}
          loading={isProcessing}
          keepSpecialCharacters
        />
      }
      toolInfo={{
        title: t('imageToBase64.title'),
        description: t('imageToBase64.description')
      }}
    />
  );
}
