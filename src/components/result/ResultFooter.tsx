import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ResultFooter({
  handleDownload,
  handleCopy,
  disabled,
  hideCopy,
  downloadLabel
}: {
  handleDownload: () => void;
  handleCopy?: () => void;
  disabled?: boolean;
  hideCopy?: boolean;
  downloadLabel?: string;
}) {
  const { t } = useTranslation();
  return (
    <Stack mt={1.5} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Button
        size="small"
        variant="contained"
        disabled={disabled}
        onClick={handleDownload}
        startIcon={<DownloadIcon />}
      >
        {downloadLabel || t('resultFooter.download')}
      </Button>
      {!hideCopy && (
        <Button
          size="small"
          variant="outlined"
          disabled={disabled}
          onClick={handleCopy}
          startIcon={<ContentPasteIcon />}
        >
          {t('resultFooter.copy')}
        </Button>
      )}
    </Stack>
  );
}
