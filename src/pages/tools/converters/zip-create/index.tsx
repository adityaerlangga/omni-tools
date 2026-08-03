import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolFileResult from '@components/result/ToolFileResult';
import TextFieldWithDesc from '@components/options/TextFieldWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { createZipFromFiles } from './service';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';
import { ContentCard } from '@components/ui/ContentCard';
import InputHeader from '@components/InputHeader';

const initialValues: InitialValuesType = {
  zipName: 'archive.zip'
};

export default function ZipCreate({ title }: ToolComponentProps) {
  const { t } = useTranslation('converters');
  const [input, setInput] = useState<File[]>([]);
  const [result, setResult] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compute = async (values: InitialValuesType, files: File[]) => {
    if (!files.length) {
      setResult(null);
      return;
    }
    try {
      setLoading(true);
      const zip = await createZipFromFiles(files, values.zipName);
      setResult(zip);
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setInput((prev) => [...prev, ...Array.from(files)]);
    event.target.value = '';
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('zipCreate.optionsTitle'),
      component: (
        <Box>
          <TextFieldWithDesc
            value={values.zipName}
            onOwnChange={(val) => updateField('zipName', val)}
            description={t('zipCreate.zipNameDescription')}
            placeholder="archive.zip"
          />
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      input={input}
      setInput={setInput}
      inputComponent={
        <ContentCard sx={{ p: 2, height: '100%' }}>
          <InputHeader title={t('zipCreate.inputTitle')} />
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              minHeight: 180,
              bgcolor: 'background.default'
            }}
          >
            {input.length === 0 ? (
              <Typography color="text.secondary">
                {t('zipCreate.emptySelection')}
              </Typography>
            ) : (
              <List dense>
                {input.map((file, index) => (
                  <ListItem
                    key={`${file.name}-${index}`}
                    secondaryAction={
                      <Button
                        size="small"
                        onClick={() =>
                          setInput((prev) => prev.filter((_, i) => i !== index))
                        }
                      >
                        {t('zipCreate.remove')}
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={file.name}
                      secondary={`${file.size} bytes`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
            >
              {t('zipCreate.addFiles')}
            </Button>
            <Button
              variant="text"
              disabled={input.length === 0}
              onClick={() => setInput([])}
            >
              {t('zipCreate.clear')}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Box>
        </ContentCard>
      }
      resultComponent={
        <ToolFileResult
          title={t('zipCreate.resultTitle')}
          value={result}
          extension="zip"
          loading={loading}
        />
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('zipCreate.toolInfo.title'),
        description: t('zipCreate.toolInfo.description')
      }}
    />
  );
}
