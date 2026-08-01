import { Paper, PaperProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

/** Shared surface for tool content panels — Nextcloud-inspired outlined cards. */
export const contentCardSx = {
  borderRadius: 1,
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: 'none'
} as const;

export function ContentCard({
  children,
  sx,
  ...props
}: PaperProps & { children?: ReactNode }) {
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        ...contentCardSx,
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export function ContentSectionTitle({
  children,
  mb = 1.25
}: {
  children: ReactNode;
  mb?: number;
}) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: 15,
        fontWeight: 600,
        color: 'text.primary',
        letterSpacing: 0.15,
        mb
      }}
    >
      {children}
    </Typography>
  );
}
