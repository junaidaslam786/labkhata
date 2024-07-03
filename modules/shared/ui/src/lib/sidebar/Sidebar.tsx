import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  AccountBox,
  Inbox,
  Business,
  ExpandLess,
  ExpandMore,
  Dashboard,
  Paid,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Collapse } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubmenus, setOpenSubmenus] = React.useState<{
    [key: string]: boolean;
  }>({
    company: false,
    accounts: false,
    transactions: false,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmenuToggle = (submenu: string) => {
    if (open) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [submenu]: !prev[submenu],
      }));
    } 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Labkhata
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/dashboard"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <ListItemButton
                onClick={() => handleSubmenuToggle('company')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Business />
                </ListItemIcon>
                <ListItemText
                  primary="Company"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {open ? (
                  openSubmenus.company ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : (
                  ''
                )}
              </ListItemButton>
              <Collapse
                in={openSubmenus.company}
                timeout="auto"
                unmountOnExit
                sx={{ ml: 4 }}
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/create-company"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        company: false,
                      }))
                    }
                  >
                    <ListItemText primary="Create Company" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/company-details"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        company: false,
                      }))
                    }
                  >
                    <ListItemText primary="Company Details" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/other-details"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        company: false,
                      }))
                    }
                  >
                    <ListItemText primary="Other Details" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
          </ListItem>
          <ListItem disablePadding>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <ListItemButton
                onClick={() => handleSubmenuToggle('transactions')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Paid />
                </ListItemIcon>
                <ListItemText
                  primary="Transactions"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {open ? (
                  openSubmenus.transactions ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : (
                  ''
                )}
              </ListItemButton>
              <Collapse
                in={openSubmenus.transactions}
                timeout="auto"
                unmountOnExit
                sx={{ ml: 4 }}
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/admin/transactions/new"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        transactions: false,
                      }))
                    }
                  >
                    <ListItemText primary="New Transaction" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/admin/transactions"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        transactions: false,
                      }))
                    }
                  >
                    <ListItemText primary="All Transactions" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/admin/transactions/detail"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        transactions: false,
                      }))
                    }
                  >
                    <ListItemText primary="Transaction Details" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
          </ListItem>
          <ListItem disablePadding>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <ListItemButton
                onClick={() => handleSubmenuToggle('accounts')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AccountBox />
                </ListItemIcon>
                <ListItemText
                  primary="Accounts"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {open ? (
                  openSubmenus.accounts ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : (
                  ''
                )}
              </ListItemButton>
              <Collapse
                in={openSubmenus.accounts}
                timeout="auto"
                unmountOnExit
                sx={{ ml: 4 }}
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/admin/accounts/create"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        accounts: false,
                      }))
                    }
                  >
                    <ListItemText primary="Create Account" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/admin/accounts/details"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        accounts: false,
                      }))
                    }
                  >
                    <ListItemText primary="Account Details" />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    to="/other-details"
                    onClick={() =>
                      setOpenSubmenus((prev) => ({
                        ...prev,
                        accounts: false,
                      }))
                    }
                  >
                    <ListItemText primary="Other Details" />
                  </ListItemButton>
                </List>
              </Collapse>
            </Box>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/customers"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AccountBox />
              </ListItemIcon>
              <ListItemText
                primary="Customers"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
