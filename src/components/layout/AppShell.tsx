import { ReactNode, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { Mode } from 'components/App';
import { TOPBAR_HEIGHT } from 'config/muiConfig';

interface AppShellProps {
  mode: Mode;
  onChangeMode: () => void;
  children: ReactNode;
}

export default function AppShell({
  mode,
  onChangeMode,
  children
}: AppShellProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default'
      }}
    >
      <TopBar
        mode={mode}
        onChangeMode={onChangeMode}
        onMenuClick={() => setMobileOpen(true)}
      />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          collapsed={!isMobile && collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
            bgcolor: 'background.default'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
