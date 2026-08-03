import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolFileResult from '@components/result/ToolFileResult';
import ToolMultiFileResult from '@components/result/ToolMultiFileResult';
import CheckboxWithDesc from '@components/options/CheckboxWithDesc';
import { GetGroupsType } from '@components/options/ToolOptions';
import { extractZipFiles, listZipEntries } from './service';
import { useTranslation } from 'react-i18next';
import { InitialValuesType, ZipEntryInfo } from './types';
import { ContentCard } from '@components/ui/ContentCard';
import InputHeader from '@components/InputHeader';
import { CustomSnackBarContext } from '../../../../contexts/CustomSnackBarContext';

const initialValues: InitialValuesType = {
  extractAll: true,
  selectedPaths: []
};

export default function ZipExtract({ title }: ToolComponentProps) {
  const { t } = useTranslation('converters');
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const [input, setInput] = useState<File | null>(null);
  const [entries, setEntries] = useState<ZipEntryInfo[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [resultFiles, setResultFiles] = useState<File[]>([]);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!input) {
        setEntries([]);
        setSelectedPaths([]);
        return;
      }
      try {
        const listed = await listZipEntries(input);
        if (cancelled) return;
        setEntries(listed);
        setSelectedPaths(listed.filter((e) => !e.isDirectory).map((e) => e.path));
      } catch (error) {
        showSnackBar(t('zipExtract.invalidZip'), 'error');
        setEntries([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [input, showSnackBar, t]);

  const compute = async (values: InitialValuesType, file: File | null) => {
    if (!file) {
      setResultFiles([]);
      setZipFile(null);
      return;
    }
    try {
      setLoading(true);
      const output = await extractZipFiles(
        file,
        selectedPaths,
        values.extractAll
      );
      setResultFiles(output.files);
      setZipFile(output.zipFile);
    } catch (error) {
      console.error(error);
      showSnackBar(t('zipExtract.extractFailed'), 'error');
      setResultFiles([]);
      setZipFile(null);
    } finally {
      setLoading(false);
    }
  };

  const togglePath = (
    path: string,
    checked: boolean,
    updateField: (field: keyof InitialValuesType, value: InitialValuesType[keyof InitialValuesType]) => void
  ) => {
    setSelectedPaths((current) => {
      const next = checked
        ? [...current, path]
        : current.filter((p) => p !== path);
      updateField('selectedPaths', next);
      return next;
    });
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('zipExtract.optionsTitle'),
      component: (
        <Box>
          <CheckboxWithDesc
            checked={values.extractAll}
            onChange={(val) => updateField('extractAll', val)}
            title={t('zipExtract.extractAll')}
            description={t('zipExtract.extractAllDescription')}
          />
          {!values.extractAll && (
            <List dense>
              {entries
                .filter((e) => !e.isDirectory)
                .map((entry) => (
                  <ListItem key={entry.path} disablePadding>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPaths.includes(entry.path)}
                          onChange={(e) =>
                            togglePath(
                              entry.path,
                              e.target.checked,
                              updateField
                            )
                          }
                        />
                      }
                      label={entry.path}
                    />
                  </ListItem>
                ))}
            </List>
          )}
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
          <InputHeader title={t('zipExtract.inputTitle')} />
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
            {input ? (
              <>
                <Typography variant="body1">{input.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {entries.filter((e) => !e.isDirectory).length}{' '}
                  {t('zipExtract.filesCount')}
                </Typography>
                <List dense>
                  {entries.slice(0, 8).map((entry) => (
                    <ListItem key={entry.path}>
                      <ListItemText
                        primary={entry.path}
                        secondary={
                          entry.isDirectory
                            ? t('zipExtract.directory')
                            : undefined
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Typography color="text.secondary">
                {t('zipExtract.emptySelection')}
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
            >
              {t('zipExtract.selectZip')}
            </Button>
            <Button
              variant="text"
              disabled={!input}
              onClick={() => setInput(null)}
            >
              {t('zipExtract.clear')}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".zip,application/zip"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setInput(file);
                e.target.value = '';
              }}
            />
          </Box>
        </ContentCard>
      }
      resultComponent={
        zipFile || resultFiles.length > 1 ? (
          <ToolMultiFileResult
            title={t('zipExtract.resultTitle')}
            value={resultFiles}
            zipFile={zipFile}
            loading={loading}
          />
        ) : (
          <ToolFileResult
            title={t('zipExtract.resultTitle')}
            value={resultFiles[0] ?? null}
            loading={loading}
          />
        )
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('zipExtract.toolInfo.title'),
        description: t('zipExtract.toolInfo.description')
      }}
    />
  );
}
