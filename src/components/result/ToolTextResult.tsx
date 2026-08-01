import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import InputHeader from '../InputHeader';
import ResultFooter from './ResultFooter';
import { replaceSpecialCharacters } from '@utils/string';
import mime from 'mime';
import { globalInputHeight } from '../../config/uiConfig';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../ui/ContentCard';

export default function ToolTextResult({
  title = 'Result',
  value,
  extension = 'txt',
  keepSpecialCharacters,
  loading
}: {
  title?: string;
  value: string;
  extension?: string;
  keepSpecialCharacters?: boolean;
  loading?: boolean;
}) {
  const { t } = useTranslation();
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => showSnackBar(t('toolTextResult.copied'), 'success'))
      .catch((err) => {
        showSnackBar(t('toolTextResult.copyFailed', { error: err }), 'error');
      });
  };
  const handleDownload = () => {
    const filename = `output-universal-tools.${extension}`;

    const mimeType = mime.getType(extension) || 'text/plain';

    const blob = new Blob([value], {
      type: mimeType
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <ContentCard sx={{ p: 2, height: '100%' }}>
      <InputHeader title={title || t('toolTextResult.result')} />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: globalInputHeight
          }}
        >
          <CircularProgress size={28} />
          <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
            {t('toolTextResult.loading')}
          </Typography>
        </Box>
      ) : (
        <TextField
          value={
            keepSpecialCharacters ? value : replaceSpecialCharacters(value)
          }
          fullWidth
          multiline
          rows={10}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              bgcolor: 'background.default',
              fontSize: 14,
              lineHeight: 1.55
            }
          }}
          inputProps={{ 'data-testid': 'text-result' }}
        />
      )}
      <ResultFooter handleCopy={handleCopy} handleDownload={handleDownload} />
    </ContentCard>
  );
}
