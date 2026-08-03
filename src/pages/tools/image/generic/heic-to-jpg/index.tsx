import { Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { ToolComponentProps } from '@tools/defineTool';
import { updateNumberField } from '@utils/string';
import { CustomSnackBarContext } from '../../../../../contexts/CustomSnackBarContext';
import { convertHeicToJpg, HeicToJpgOptions } from './service';

const initialValues: HeicToJpgOptions = {
  quality: 90
};

export default function HeicToJpg({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = async (options: HeicToJpgOptions, inputFile: File | null) => {
    if (!inputFile) return;
    setIsProcessing(true);
    try {
      const output = await convertHeicToJpg(inputFile, options);
      setResult(output);
    } catch (err) {
      console.error(err);
      showSnackBar(t('heicToJpg.error'), 'error');
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const getGroups: GetGroupsType<HeicToJpgOptions> = ({
    values,
    updateField
  }) => [
    {
      title: t('heicToJpg.optionsTitle'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={values.quality}
            onOwnChange={(value) =>
              updateNumberField(value, 'quality', updateField)
            }
            description={t('heicToJpg.qualityDescription')}
            type="number"
            inputProps={{ min: 10, max: 100, step: 1 }}
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
          accept={['image/heic', 'image/heif', '.heic', '.heif', 'image/*']}
          title={t('heicToJpg.inputTitle')}
        />
      }
      resultComponent={
        <ToolFileResult
          title={t('heicToJpg.resultTitle')}
          value={result}
          extension="jpg"
          loading={isProcessing}
          loadingText={t('heicToJpg.loadingText')}
        />
      }
      toolInfo={{
        title: t('heicToJpg.title'),
        description: t('heicToJpg.description')
      }}
    />
  );
}
