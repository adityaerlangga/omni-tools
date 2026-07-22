import { Box, Button, Stack, styled, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import ToolBreadcrumb from './ToolBreadcrumb';
import Grid from '@mui/material/Grid';
import { Icon, IconifyIcon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { isBookmarked, toggleBookmarked } from '@utils/bookmark';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getModuleForCategory } from 'config/navModules';
import { ToolCategory } from '@tools/defineTool';
import { validNamespaces } from '../i18n';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}));

interface ToolHeaderProps {
  title: string;
  description: string;
  icon?: IconifyIcon | string;
  type: string;
  path: string;
}

function ToolLinks() {
  const { t } = useTranslation();
  const [examplesVisible, setExamplesVisible] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const element = document.getElementById('examples');
      if (element) setExamplesVisible(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToElement = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Grid container spacing={1.5} mt={1}>
      {isMd && (
        <Grid item xs={12} sm={6}>
          <StyledButton
            fullWidth
            variant="outlined"
            onClick={() => scrollToElement('tool')}
          >
            Use This Tool
          </StyledButton>
        </Grid>
      )}
      {examplesVisible && (
        <Grid item xs={12} sm={6}>
          <StyledButton
            fullWidth
            variant="outlined"
            onClick={() => scrollToElement('examples')}
          >
            {t('toolHeader.seeExamples')}
          </StyledButton>
        </Grid>
      )}
    </Grid>
  );
}

export default function ToolHeader({
  icon,
  title,
  description,
  type,
  path
}: ToolHeaderProps) {
  const theme = useTheme();
  const { t } = useTranslation(validNamespaces);
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked(path));
  const mod = getModuleForCategory(type as ToolCategory);
  // @ts-ignore dynamic nav label
  const moduleLabel = mod ? (t(`translation:${mod.labelKey}`) as string) : type;
  const moduleLink = mod ? `/modules/${mod.id}` : `/categories/${type}`;

  return (
    <Box mb={3}>
      <ToolBreadcrumb
        items={[
          { title: 'Home', link: '/' },
          { title: moduleLabel, link: moduleLink },
          { title }
        ]}
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        mt={2}
      >
        <Box flex={1}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {icon && (
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(28,175,255,0.12)'
                      : 'rgba(0,130,201,0.1)'
                }}
              >
                <Icon
                  icon={icon}
                  width={28}
                  color={theme.palette.primary.main}
                />
              </Box>
            )}
            <Typography variant="h5" fontWeight={700} color="primary.main">
              {title}
            </Typography>
            <IconButton
              onClick={() => {
                toggleBookmarked(path);
                setBookmarked(!bookmarked);
              }}
              aria-label="bookmark"
            >
              <Icon
                width={24}
                color={
                  bookmarked
                    ? theme.palette.primary.main
                    : theme.palette.grey[500]
                }
                icon={bookmarked ? 'mdi:bookmark' : 'mdi:bookmark-plus-outline'}
              />
            </IconButton>
          </Stack>
          <Typography mt={1.5} color="text.secondary" fontSize={15}>
            {description}
          </Typography>
          <ToolLinks />
        </Box>
      </Stack>
    </Box>
  );
}
