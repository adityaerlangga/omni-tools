import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  buildNavModules,
  getActiveModuleId,
  NavModuleId
} from 'config/navModules';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from 'config/muiConfig';
import { validNamespaces } from '../../i18n';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

function SidebarNavContent({
  collapsed,
  onNavigate,
  onToggleCollapsed,
  showCollapseToggle
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleCollapsed?: () => void;
  showCollapseToggle?: boolean;
}) {
  const theme = useTheme();
  const { t } = useTranslation(validNamespaces);
  const location = useLocation();
  const modules = useMemo(
    () =>
      buildNavModules((key) =>
        // @ts-ignore dynamic nav label
        t(`translation:${key}`)
      ),
    [t]
  );
  const activeModuleId = getActiveModuleId(location.pathname);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeModuleId) {
      setOpenModules((prev) => ({ ...prev, [activeModuleId]: true }));
    }
  }, [activeModuleId]);

  const toggleModule = (id: NavModuleId) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentPath = location.pathname.replace(/^\//, '');

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.sidebar',
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={collapsed ? 'center' : 'space-between'}
        px={collapsed ? 1 : 2}
        py={1.5}
        sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 56 }}
      >
        {!collapsed && (
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={700}
            letterSpacing={1}
            sx={{ textTransform: 'uppercase' }}
          >
            Modules
          </Typography>
        )}
        {showCollapseToggle && onToggleCollapsed && (
          <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <IconButton size="small" onClick={onToggleCollapsed}>
              <Icon
                icon={
                  collapsed
                    ? 'mdi:chevron-double-right'
                    : 'mdi:chevron-double-left'
                }
                width={20}
              />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <List dense disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            selected={location.pathname === '/'}
            onClick={onNavigate}
            sx={{ mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36 }}>
              <Icon icon="mdi:view-dashboard-outline" width={22} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Home" />}
          </ListItemButton>

          {modules
            .filter((mod) => mod.children.length > 0)
            .map((mod) => {
              const open = !!openModules[mod.id];
              const isActiveModule = activeModuleId === mod.id;
              const label =
                // @ts-ignore dynamic nav label
                t(`translation:${mod.labelKey}`) as string;

              if (collapsed) {
                return (
                  <Tooltip key={mod.id} title={label} placement="right">
                    <ListItemButton
                      component={RouterLink}
                      to={`/modules/${mod.id}`}
                      selected={isActiveModule}
                      onClick={onNavigate}
                      sx={{ justifyContent: 'center', mb: 0.25 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <Icon icon={mod.icon} width={22} />
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                );
              }

              return (
                <Box key={mod.id} mb={0.25}>
                  <ListItemButton
                    onClick={() => toggleModule(mod.id)}
                    sx={{
                      bgcolor: isActiveModule
                        ? theme.palette.mode === 'dark'
                          ? 'rgba(28,175,255,0.08)'
                          : 'rgba(0,130,201,0.06)'
                        : undefined
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Icon icon={mod.icon} width={22} />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: 14
                      }}
                    />
                    <Icon
                      icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                      width={18}
                    />
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List dense disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/modules/${mod.id}`}
                        selected={location.pathname === `/modules/${mod.id}`}
                        onClick={onNavigate}
                        sx={{ pl: 4.5 }}
                      >
                        <ListItemText
                          primary="Overview"
                          primaryTypographyProps={{ fontSize: 13 }}
                        />
                      </ListItemButton>
                      {mod.children.map((child) => (
                        <ListItemButton
                          key={child.path}
                          component={RouterLink}
                          to={`/${child.path}`}
                          selected={currentPath === child.path}
                          onClick={onNavigate}
                          sx={{ pl: 4.5 }}
                        >
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <Icon icon={child.icon} width={16} />
                          </ListItemIcon>
                          <ListItemText
                            primary={child.shortLabel}
                            primaryTypographyProps={{ fontSize: 13 }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            })}
        </List>
      </Box>
    </Box>
  );
}

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapsed
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        <SidebarNavContent collapsed={false} onNavigate={onMobileClose} />
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
            border: 'none',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
          }
        }}
      >
        <SidebarNavContent
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
          showCollapseToggle
        />
      </Drawer>
    </Box>
  );
}

export type { SidebarProps };
