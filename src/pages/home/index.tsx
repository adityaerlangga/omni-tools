import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import ToolSearch from 'components/layout/ToolSearch';
import { buildNavModules } from 'config/navModules';
import { tools } from '@tools/index';
import { getBookmarkedToolPaths } from '@utils/bookmark';
import UserTypeFilter from '@components/UserTypeFilter';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import { validNamespaces } from '../../i18n';

const QUICK_START = [
  'image-generic/compress',
  'image-generic/editor',
  'image-generic/crop',
  'pdf/split-pdf',
  'pdf/rotate-pdf',
  'pdf/merge-pdf',
  'json/prettify',
  'string/split'
];

export default function Home() {
  const theme = useTheme();
  const { t } = useTranslation(validNamespaces);
  const navigate = useNavigate();
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();
  const modules = useMemo(
    () =>
      buildNavModules((key) =>
        // @ts-ignore dynamic nav label
        t(`translation:${key}`)
      ),
    [t]
  );
  const [bookmarked] = useState(() => getBookmarkedToolPaths());

  const bookmarkedTools = bookmarked
    .map((path) => tools.find((tool) => tool.path === path))
    .filter(Boolean);

  const quickTools = QUICK_START.map((path) =>
    tools.find((tool) => tool.path === path)
  ).filter(Boolean);

  return (
    <Box px={{ xs: 2, md: 3 }} py={{ xs: 2, md: 3 }} maxWidth={1200} mx="auto">
      <Helmet>
        <title>Universal Tools</title>
      </Helmet>

      <Box
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 4 },
          borderRadius: 3,
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, #1a2330 100%)`
              : `linear-gradient(135deg, #FFFFFF 0%, #EBF5FF 100%)`,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {t('translation:dashboard.title')}{' '}
          <Box component="span" color="primary.main">
            {t('translation:hero.brand')}
          </Box>
        </Typography>
        <Typography color="text.secondary" mb={3} maxWidth={640}>
          {t('translation:dashboard.subtitle')}
        </Typography>
        <Box maxWidth={560}>
          <ToolSearch size="medium" autoFocus />
        </Box>
        <Box mt={2}>
          <UserTypeFilter
            selectedUserTypes={selectedUserTypes}
            onUserTypesChange={setSelectedUserTypes}
          />
        </Box>
      </Box>

      {bookmarkedTools.length > 0 && (
        <Box mb={4}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            {t('translation:dashboard.bookmarked')}
          </Typography>
          <Grid container spacing={1.5}>
            {bookmarkedTools.map((tool) =>
              tool ? (
                <Grid item xs={12} sm={6} md={3} key={tool.path}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardActionArea
                      onClick={() => navigate('/' + tool.path)}
                      sx={{ height: '100%' }}
                    >
                      <CardContent>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Icon
                            icon={tool.icon}
                            width={28}
                            color={theme.palette.primary.main}
                          />
                          <Typography fontWeight={600} fontSize={14}>
                            {t(tool.name)}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </Box>
      )}

      <Box mb={4}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {t('translation:dashboard.popular')}
        </Typography>
        <Grid container spacing={1.5}>
          {quickTools.map((tool) =>
            tool ? (
              <Grid item xs={12} sm={6} md={3} key={tool.path}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 16px rgba(0, 130, 201, 0.12)'
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate('/' + tool.path)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent>
                      <Icon
                        icon={tool.icon}
                        width={32}
                        color={theme.palette.primary.main}
                      />
                      <Typography fontWeight={700} mt={1.5} fontSize={15}>
                        {t(tool.name)}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary" mt={0.5}>
                        {t(tool.shortDescription)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {t('translation:dashboard.explore')}
        </Typography>
        <Grid container spacing={1.5}>
          {modules
            .filter((mod) => mod.children.length > 0)
            .map((mod) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={mod.id}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 16px rgba(0, 130, 201, 0.12)'
                    }
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      mb={1}
                    >
                      <Icon
                        icon={mod.icon}
                        width={28}
                        color={theme.palette.primary.main}
                      />
                      <Typography fontWeight={700}>
                        {
                          // @ts-ignore dynamic nav label
                          t(`translation:${mod.labelKey}`) as string
                        }
                      </Typography>
                    </Stack>
                    <Typography fontSize={13} color="text.secondary" mb={2}>
                      {t('translation:dashboard.toolsCount', {
                        count: mod.children.length
                      })}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={`/modules/${mod.id}`}
                      size="small"
                      variant="contained"
                    >
                      {t('translation:dashboard.viewModule')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
