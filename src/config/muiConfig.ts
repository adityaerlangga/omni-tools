import { createTheme, ThemeOptions } from '@mui/material';

/**
 * Nextcloud-inspired theme for Universal Tools
 * Colors from https://nextcloud.com/brand/
 */
export const nextcloud = {
  blue: '#0082C9',
  blueLight: '#1CAFFF',
  blueDark: '#006AA3',
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F5F7FA',
  gray100: '#E8EEF4',
  gray200: '#D5DEE8',
  gray800: '#1A1D1F',
  gray900: '#121415',
  sidebarLight: '#FFFFFF',
  sidebarDark: '#16191B'
};

export const SIDEBAR_WIDTH = 268;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
export const TOPBAR_HEIGHT = 56;

const sharedThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, lineHeight: 1.2 },
    h2: { fontWeight: 700, lineHeight: 1.2 },
    h3: { fontWeight: 700, lineHeight: 1.5 },
    body1: { lineHeight: 1.5 },
    body2: { lineHeight: 1.5 },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  zIndex: { snackbar: 100000 },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginLeft: 8,
          marginRight: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 130, 201, 0.12)',
            color: nextcloud.blue,
            '&:hover': {
              backgroundColor: 'rgba(0, 130, 201, 0.18)'
            },
            '& .MuiListItemIcon-root': {
              color: nextcloud.blue
            }
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${nextcloud.gray100}`
        }
      }
    }
  }
};

export const lightTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: nextcloud.blue,
      light: nextcloud.blueLight,
      dark: nextcloud.blueDark,
      contrastText: nextcloud.white
    },
    secondary: {
      main: nextcloud.blueLight,
      contrastText: nextcloud.white
    },
    background: {
      default: nextcloud.gray50,
      paper: nextcloud.white,
      hover: '#FAFBFC',
      lightSecondary: '#EBF5FF',
      darkSecondary: nextcloud.blueDark,
      sidebar: nextcloud.sidebarLight
    },
    text: {
      primary: nextcloud.black,
      secondary: '#4B5563'
    },
    divider: nextcloud.gray100
  },
  components: {
    ...sharedThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: nextcloud.gray50,
          backgroundImage: 'none'
        },
        a: {
          color: nextcloud.blue
        },
        '*:focus-visible': {
          outline: `2px solid ${nextcloud.blueLight}`,
          outlineOffset: 2
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: nextcloud.white,
          backgroundColor: nextcloud.blue,
          backgroundImage: `linear-gradient(45deg, ${nextcloud.blue}, ${nextcloud.blueLight})`,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: nextcloud.blueDark,
            backgroundImage: `linear-gradient(45deg, ${nextcloud.blueDark}, ${nextcloud.blue})`,
            boxShadow: '0 2px 8px rgba(0, 130, 201, 0.35)'
          }
        },
        outlined: {
          borderColor: nextcloud.blue,
          color: nextcloud.blue
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: `1px solid ${nextcloud.gray100}`,
          backgroundColor: nextcloud.white,
          color: nextcloud.black
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: nextcloud.blueLight,
      light: '#5CC8FF',
      dark: nextcloud.blue,
      contrastText: nextcloud.white
    },
    secondary: {
      main: nextcloud.blue,
      contrastText: nextcloud.white
    },
    background: {
      default: nextcloud.gray900,
      paper: nextcloud.gray800,
      hover: '#1E2224',
      lightSecondary: '#1A2330',
      darkSecondary: nextcloud.blue,
      sidebar: nextcloud.sidebarDark
    },
    text: {
      primary: nextcloud.white,
      secondary: '#A8B3BD'
    },
    divider: '#2A3034'
  },
  components: {
    ...sharedThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: nextcloud.gray900,
          backgroundImage: 'none'
        },
        a: {
          color: nextcloud.blueLight
        },
        '*:focus-visible': {
          outline: `2px solid ${nextcloud.blueLight}`,
          outlineOffset: 2
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: nextcloud.white,
          backgroundColor: nextcloud.blue,
          backgroundImage: `linear-gradient(45deg, ${nextcloud.blue}, ${nextcloud.blueLight})`,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: nextcloud.blueLight,
            backgroundImage: `linear-gradient(45deg, ${nextcloud.blueDark}, ${nextcloud.blueLight})`,
            boxShadow: '0 2px 8px rgba(28, 175, 255, 0.35)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid #2A3034',
          backgroundColor: nextcloud.sidebarDark,
          color: nextcloud.white
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #2A3034',
          backgroundColor: nextcloud.sidebarDark
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginLeft: 8,
          marginRight: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(28, 175, 255, 0.16)',
            color: nextcloud.blueLight,
            '&:hover': {
              backgroundColor: 'rgba(28, 175, 255, 0.22)'
            },
            '& .MuiListItemIcon-root': {
              color: nextcloud.blueLight
            }
          }
        }
      }
    }
  }
});
