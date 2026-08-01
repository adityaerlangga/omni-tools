import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export default function ToolInputAndResult({
  input,
  result
}: {
  input?: ReactNode;
  result?: ReactNode;
}) {
  if (input || result) {
    return (
      <Grid id="tool" container spacing={1.5} alignItems="stretch">
        {input && (
          <Grid item xs={12} md={result ? 6 : 12}>
            {input}
          </Grid>
        )}
        <Grid item xs={12} md={input ? 6 : 12}>
          {result}
        </Grid>
      </Grid>
    );
  }
}
