import { Divider } from '@mui/material';
import React from 'react';

type SeparatorProps = {
  backgroundColor?: string;
  margin?: string | number;
};

export default function Separator({
  backgroundColor = 'divider',
  margin = '32px'
}: SeparatorProps) {
  return (
    <Divider
      orientation="horizontal"
      variant="fullWidth"
      sx={{
        borderColor: backgroundColor,
        borderBottomWidth: '1px',
        my: margin
      }}
    />
  );
}
