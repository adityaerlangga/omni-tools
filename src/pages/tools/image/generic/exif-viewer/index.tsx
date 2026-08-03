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
import { ExifViewerOptions, readExifMetadata } from './service';

const initialValues: ExifViewerOptions = {
  includeGps: true
};

export default function ExifViewer({ title }: ToolComponentProps) {
  const { t } = useTranslation('image');
  const [input, setInput] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const compute = async (
    options: ExifViewerOptions,
    inputFile: File | null
  ) => {
    if (!inputFile) return;
    setIsProcessing(true);
    try {
      const output = await readExifMetadata(inputFile, options);
      setResult(output);
    } catch (err) {
      console.error(err);
      showSnackBar(t('exifViewer.error'), 'error');
      setResult('');
    } finally {
      setIsProcessing(false);
    }
  };

  const getGroups: GetGroupsType<ExifViewerOptions> = ({
    values,
    updateField
  }) => [
    {
      title: t('exifViewer.optionsTitle'),
      component: (
        <Box>
          <CheckboxWithDesc
            checked={values.includeGps}
            onChange={(value) => updateField('includeGps', value)}
            title={t('exifViewer.includeGps')}
            description={t('exifViewer.includeGpsDescription')}
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
          title={t('exifViewer.inputTitle')}
        />
      }
      resultComponent={
        <ToolTextResult
          title={t('exifViewer.resultTitle')}
          value={result}
          loading={isProcessing}
        />
      }
      toolInfo={{
        title: t('exifViewer.title'),
        description: t('exifViewer.description')
      }}
    />
  );
}
