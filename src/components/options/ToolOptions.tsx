import { Box, Stack, useTheme } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import ToolOptionGroups, { ToolOptionGroup } from './ToolOptionGroups';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../ui/ContentCard';

export type UpdateField<T> = <Y extends keyof T>(field: Y, value: T[Y]) => void;
type NonEmptyArray<T> = [T, ...T[]];
export type GetGroupsType<T> = (
  formikProps: FormikProps<T> & { updateField: UpdateField<T> }
) => NonEmptyArray<ToolOptionGroup>;

export default function ToolOptions<T extends FormikValues>({
  children,
  getGroups,
  vertical
}: {
  children?: ReactNode;
  getGroups: GetGroupsType<T> | null;
  vertical?: boolean;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const formikContext = useFormikContext<T>();

  if (!getGroups) {
    return null;
  }

  const updateField: UpdateField<T> = (field, value) => {
    formikContext.setFieldValue(field as string, value);
  };

  return (
    <ContentCard
      sx={{
        mt: 2.5,
        mb: 2,
        p: { xs: 2, md: 2.5 }
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(28,175,255,0.12)'
                : 'rgba(0,130,201,0.1)',
            color: 'primary.main'
          }}
        >
          <SettingsOutlinedIcon fontSize="small" />
        </Box>
        <Typography fontSize={16} fontWeight={600}>
          {t('toolOptions.title')}
        </Typography>
      </Stack>
      <Box mt={2}>
        <Stack direction="row" spacing={2}>
          <ToolOptionGroups
            groups={getGroups({ ...formikContext, updateField }) ?? null}
            vertical={vertical}
          />
          {children}
        </Stack>
      </Box>
    </ContentCard>
  );
}
