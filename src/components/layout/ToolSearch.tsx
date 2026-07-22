import { useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  darken,
  lighten,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DefinedTool } from '@tools/defineTool';
import { filterTools, tools } from '@tools/index';
import { getToolCategoryTitle } from '@utils/string';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import { getModuleForCategory } from 'config/navModules';
import { validNamespaces } from '../../i18n';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8)
  })
}));

interface ToolSearchProps {
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  autoFocus?: boolean;
}

export default function ToolSearch({
  size = 'small',
  fullWidth = true,
  autoFocus = false
}: ToolSearchProps) {
  const { t } = useTranslation(validNamespaces);
  const theme = useTheme();
  const navigate = useNavigate();
  const { selectedUserTypes } = useUserTypeFilter();
  const [inputValue, setInputValue] = useState('');
  const [filteredTools, setFilteredTools] = useState<DefinedTool[]>(tools);

  const handleInputChange = (
    _event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setFilteredTools(filterTools(tools, newInputValue, selectedUserTypes, t));
  };

  const options = useMemo(() => filteredTools, [filteredTools]);

  return (
    <Autocomplete
      size={size}
      fullWidth={fullWidth}
      autoHighlight
      options={options}
      noOptionsText={t('translation:hero.search.noResult')}
      filterOptions={(opts) => opts}
      groupBy={(option) => {
        const mod = getModuleForCategory(option.type);
        if (mod) {
          // @ts-ignore dynamic module label key
          return t(`translation:${mod.labelKey}`) as string;
        }
        return getToolCategoryTitle(option.type, t);
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => t(option.name)}
      onChange={(_e, value) => {
        if (value) navigate('/' + value.path);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={autoFocus}
          placeholder={t('translation:hero.search.placeholder')}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon
                sx={{ color: 'text.secondary', ml: 0.5, mr: 0.5 }}
                fontSize="small"
              />
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }
          }}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <ul style={{ padding: 0 }}>{params.children}</ul>
        </li>
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.path}>
          <Stack direction="row" spacing={1.5} alignItems="center" width="100%">
            <Icon
              icon={option.icon}
              width={20}
              color={theme.palette.primary.main}
            />
            <Box>
              <Typography fontWeight={600} fontSize={14}>
                {t(option.name)}
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                {t(option.shortDescription)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
    />
  );
}
