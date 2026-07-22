import {
  Box,
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
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { buildNavModules, getModuleById, NavModuleId } from 'config/navModules';
import ToolBreadcrumb from 'components/ToolBreadcrumb';
import { validNamespaces } from '../../i18n';

export default function ModuleOverview() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { t } = useTranslation(validNamespaces);
  const theme = useTheme();
  const navigate = useNavigate();

  const def = getModuleById(moduleId as NavModuleId);
  const modules = useMemo(
    () =>
      buildNavModules((key) =>
        // @ts-ignore dynamic nav label
        t(`translation:${key}`)
      ),
    [t]
  );
  const mod = modules.find((m) => m.id === moduleId);

  if (!def || !mod) {
    return (
      <Box p={3}>
        <Typography>Module not found.</Typography>
      </Box>
    );
  }

  // @ts-ignore dynamic nav label
  const title = t(`translation:${def.labelKey}`) as string;

  return (
    <Box px={{ xs: 2, md: 3 }} py={{ xs: 2, md: 3 }} maxWidth={1100} mx="auto">
      <Helmet>
        <title>{`${title} - Universal Tools`}</title>
      </Helmet>

      <ToolBreadcrumb items={[{ title: 'Home', link: '/' }, { title }]} />

      <Stack direction="row" spacing={2} alignItems="center" mt={2} mb={1}>
        <Icon icon={def.icon} width={40} color={theme.palette.primary.main} />
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            {t('translation:dashboard.toolsCount', {
              count: mod.children.length
            })}
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={1.5} mt={1}>
        {mod.children.map((child) => (
          <Grid item xs={12} sm={6} md={4} key={child.path}>
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
                onClick={() => navigate('/' + child.path)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Icon
                      icon={child.icon}
                      width={28}
                      color={theme.palette.primary.main}
                    />
                    <Box>
                      <Typography fontWeight={700} fontSize={15}>
                        {child.shortLabel}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary" mt={0.5}>
                        {t(child.tool.shortDescription)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
