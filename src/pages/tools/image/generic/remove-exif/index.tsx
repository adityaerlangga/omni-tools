import { Box } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolContent from '@components/ToolContent';
import ToolImageInput from '@components/input/ToolImageInput';
import ToolFileResult from '@components/result/ToolFileResult';
import SelectWithDesc from '@components/options/SelectWithDesc';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { ToolComponentProps } from '@tools/defineTool';
import { updateNumberField } from '@utils/string';
import { CustomSnackBarContext } from '../../../../../contexts/CustomSnackBarContext';
import {
  OutputFormat,
  RemoveExifOptions,
  removeExifFromImage
} from './service';

const initialValues: RemoveExifOptions = {
  outputFormat: 'jpeg',
  jpegQuality: 92
};

export default function RemoveExif({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = async (
    options: RemoveExifOptions,
    inputFile: File | null
  ) => {
    if (!inputFile) return;
    setIsProcessing(true);
    try {
      const output = await removeExifFromImage(inputFile, options);
      setResult(output);
    } catch (err) {
      console.error(err);
      showSnackBar(t('removeExif.error'), 'error');
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const getGroups: GetGroupsType<RemoveExifOptions> = ({
    values,
    updateField
  }) => [
    {
      title: t('removeExif.optionsTitle'),
      component: (
        <Box>
          <SelectWithDesc
            selected={values.outputFormat}
            onChange={(value) =>
              updateField('outputFormat', value as OutputFormat)
            }
            description={t('removeExif.outputFormatDescription')}
            options={[
              { label: 'JPEG', value: 'jpeg' },
              { label: 'PNG', value: 'png' }
            ]}
          />
          {values.outputFormat === 'jpeg' && (
            <TextFieldWithDesc
              value={values.jpegQuality}
              onOwnChange={(value) =>
                updateNumberField(value, 'jpegQuality', updateField)
              }
              description={t('removeExif.jpegQualityDescription')}
              type="number"
              inputProps={{ min: 10, max: 100, step: 1 }}
            />
          )}
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
          title={t('removeExif.inputTitle')}
        />
      }
      resultComponent={
        <ToolFileResult
          title={t('removeExif.resultTitle')}
          value={result}
          extension={result?.name.split('.').pop() || 'jpg'}
          loading={isProcessing}
          loadingText={t('removeExif.loadingText')}
        />
      }
      toolInfo={{
        title: t('removeExif.title'),
        description: t('removeExif.description')
      }}
    />
  );
}
