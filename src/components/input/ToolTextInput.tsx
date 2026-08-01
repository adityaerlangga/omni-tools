import { TextField } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import InputHeader from '../InputHeader';
import InputFooter from './InputFooter';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../ui/ContentCard';

export default function ToolTextInput({
  value,
  onChange,
  title = 'Input text',
  placeholder
}: {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => showSnackBar(t('toolTextInput.copied'), 'success'))
      .catch((err) => {
        showSnackBar(t('toolTextInput.copyFailed', { error: err }), 'error');
      });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          onChange(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <ContentCard sx={{ p: 2, height: '100%' }}>
      <InputHeader title={title || t('toolTextInput.input')} />
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        multiline
        rows={10}
        placeholder={placeholder || t('toolTextInput.placeholder')}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            bgcolor: 'background.default',
            fontSize: 14,
            lineHeight: 1.55
          }
        }}
        inputProps={{
          'data-testid': 'text-input'
        }}
      />
      <InputFooter handleCopy={handleCopy} handleImport={handleImportClick} />
      <input
        type="file"
        accept="*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </ContentCard>
  );
}
