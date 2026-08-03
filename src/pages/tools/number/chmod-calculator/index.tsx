import { Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useState } from 'react';
import ToolContent from '@components/ToolContent';
import { ToolComponentProps } from '@tools/defineTool';
import ToolTextResult from '@components/result/ToolTextResult';
import { GetGroupsType } from '@components/options/ToolOptions';
import { calculateChmod, formatChmodResult } from './service';
import { useTranslation } from 'react-i18next';
import { InitialValuesType } from './types';

const initialValues: InitialValuesType = {
  ur: true,
  uw: true,
  ux: true,
  gr: true,
  gw: false,
  gx: true,
  or: true,
  ow: false,
  ox: true
};

type PermKey = keyof InitialValuesType;

const PERM_GROUPS: {
  titleKey: 'owner' | 'group' | 'other';
  keys: PermKey[];
}[] = [
  { titleKey: 'owner', keys: ['ur', 'uw', 'ux'] },
  { titleKey: 'group', keys: ['gr', 'gw', 'gx'] },
  { titleKey: 'other', keys: ['or', 'ow', 'ox'] }
];

const LABEL_MAP: Record<string, string> = {
  ur: 'r',
  uw: 'w',
  ux: 'x',
  gr: 'r',
  gw: 'w',
  gx: 'x',
  or: 'r',
  ow: 'w',
  ox: 'x'
};

export default function ChmodCalculator({ title }: ToolComponentProps) {
  const { t } = useTranslation('number');
  const [result, setResult] = useState<string>('');

  const compute = (values: InitialValuesType) => {
    setResult(formatChmodResult(calculateChmod(values)));
  };

  const getGroups: GetGroupsType<InitialValuesType> = ({
    values,
    updateField
  }) => [
    {
      title: t('chmodCalculator.permissionsTitle'),
      component: (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {PERM_GROUPS.map((group) => (
            <Box key={group.titleKey}>
              <Typography variant="subtitle2" gutterBottom>
                {t(`chmodCalculator.${group.titleKey}`)}
              </Typography>
              <FormGroup>
                {group.keys.map((key) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={values[key]}
                        onChange={(e) => updateField(key, e.target.checked)}
                      />
                    }
                    label={LABEL_MAP[key]}
                  />
                ))}
              </FormGroup>
            </Box>
          ))}
        </Box>
      )
    }
  ];

  return (
    <ToolContent
      title={title}
      inputComponent={null}
      resultComponent={
        <ToolTextResult
          title={t('chmodCalculator.resultTitle')}
          value={result}
        />
      }
      initialValues={initialValues}
      getGroups={getGroups}
      compute={compute}
      toolInfo={{
        title: t('chmodCalculator.toolInfo.title'),
        description: t('chmodCalculator.toolInfo.description')
      }}
    />
  );
}
