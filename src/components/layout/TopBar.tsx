import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mode } from 'components/App';
import ToolSearch from './ToolSearch';
import logoUt from 'assets/logo-ut.svg';
import { TOPBAR_HEIGHT } from 'config/muiConfig';
import { validNamespaces } from '../../i18n';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' }
];

interface TopBarProps {
  mode: Mode;
  onChangeMode: () => void;
  onMenuClick: () => void;
}

export default function TopBar({
  mode,
  onChangeMode,
  onMenuClick
}: TopBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, i18n } = useTranslation(validNamespaces);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        height: TOPBAR_HEIGHT,
        zIndex: (t) => t.zIndex.drawer + 1
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${TOPBAR_HEIGHT}px !important`,
          gap: 2,
          px: { xs: 1.5, md: 2 }
        }}
      >
        {isMobile && (
          <IconButton edge="start" onClick={onMenuClick} aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}

        <Stack
          component={RouterLink}
          to="/"
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}
        >
          <Box
            component="img"
            src={logoUt}
            alt="Universal Tools"
            sx={{ width: 36, height: 36, borderRadius: 1.5 }}
          />
          {!isMobile && (
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ letterSpacing: -0.3, whiteSpace: 'nowrap' }}
            >
              {t('translation:navbar.brand')}
            </Typography>
          )}
        </Stack>

        <Box sx={{ flex: 1, maxWidth: 520, mx: 'auto' }}>
          <ToolSearch size="small" />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
          <FormControl size="small" sx={{ minWidth: isMobile ? 64 : 110 }}>
            <Select
              value={i18n.language}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem('lang', e.target.value);
              }}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                }
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {isMobile ? lang.code.toUpperCase() : lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={onChangeMode} aria-label="toggle theme">
            <Icon
              width={24}
              icon={
                mode === 'dark'
                  ? 'ic:round-dark-mode'
                  : mode === 'light'
                    ? 'ic:round-light-mode'
                    : 'ic:round-contrast'
              }
            />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
