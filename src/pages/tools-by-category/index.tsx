import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import { filterTools, getToolsByCategory } from '../../tools';
import { getToolCategoryTitle } from '@utils/string';
import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Helmet } from 'react-helmet';
import UserTypeFilter from '@components/UserTypeFilter';
import { useTranslation } from 'react-i18next';
import { validNamespaces } from '../../i18n';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';
import { getModuleForCategory, NavModuleId } from 'config/navModules';
import { ToolCategory } from '@tools/defineTool';

export default function ToolsByCategory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation(validNamespaces);
  const rawTitle = getToolCategoryTitle(categoryName as string, t);

  const toolsByCategory = getToolsByCategory(selectedUserTypes, t).find(
    ({ type }) => type === categoryName
  );
  const categoryDefinedTools = toolsByCategory?.tools ?? [];

  const categoryTools = filterTools(
    categoryDefinedTools,
    searchTerm,
    selectedUserTypes,
    t
  );

  const mod = getModuleForCategory(categoryName as ToolCategory);

  useEffect(() => {
    // Prefer module overview for merged modules (e.g. Image = image-generic + png)
    if (mod && mod.categories.length > 1) {
      navigate(`/modules/${mod.id as NavModuleId}`, { replace: true });
    }
  }, [mod, navigate]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Box
      ref={mainContentRef}
      px={{ xs: 2, md: 3 }}
      py={{ xs: 2, md: 3 }}
      maxWidth={1100}
      mx="auto"
    >
      <Helmet>
        <title>{`${rawTitle} - Universal Tools`}</title>
      </Helmet>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            onClick={() => navigate(mod ? `/modules/${mod.id}` : '/')}
            aria-label="back"
          >
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            {rawTitle}
          </Typography>
        </Stack>
        <TextField
          size="small"
          placeholder={t('translation:hero.search.placeholder')}
          aria-label={t('translation:hero.search.placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon fontSize="small" />,
            sx: {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              minWidth: { md: 280 }
            }
          }}
        />
      </Stack>

      <Box mb={2}>
        <UserTypeFilter
          selectedUserTypes={selectedUserTypes}
          onUserTypesChange={setSelectedUserTypes}
        />
      </Box>

      <Grid container spacing={1.5}>
        {categoryTools.map((tool, index) => (
          <Grid item xs={12} sm={6} md={4} key={tool.path}>
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
              <CardActionArea
                onClick={() => navigate('/' + tool.path)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Icon
                      icon={tool.icon}
                      width={28}
                      color={theme.palette.primary.main}
                    />
                    <Box>
                      <Typography fontWeight={700} fontSize={15}>
                        {
                          // @ts-ignore
                          t(tool.name)
                        }
                      </Typography>
                      <Typography fontSize={13} color="text.secondary" mt={0.5}>
                        {
                          // @ts-ignore
                          t(tool.shortDescription)
                        }
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
