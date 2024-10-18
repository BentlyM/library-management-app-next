'use client';

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookIcon from '@mui/icons-material/Book';
import SendIcon from '@mui/icons-material/Send';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import LogoutButton from '../components/logout/LogoutButton';

const drawerWidth = 240;

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname()
    .split('/')
    .filter((index) => index !== '');
  const [title, setTitle] = React.useState('');

  const user = useQuery<{
    id: string;
    name: string | null;
    email: string;
  }>({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then((res) => res.json()),
  });

  const navigation = [
    { text: 'Home', icon: <ImportContactsIcon />, to: '/dashboard' },
    { text: 'Add Book', icon: <AddBoxIcon />, to: '/dashboard/add' },
    { text: 'Discover Books', icon: <BookIcon />, to: '/dashboard/discover' },
    { text: 'Send Books', icon: <SendIcon />, to: '/dashboard/send' },
    { text: 'Profile', icon: <AccountCircleIcon />, to: '/dashboard/settings' },
  ];

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  React.useEffect(() => {
    const currentPath = pathname[1];
    const navItem = navigation.find((item) => item.to.includes(currentPath));
    setTitle(navItem ? navItem.text : 'Home Content');
  }, [pathname]);

  const isSmallViewport = window.innerWidth < theme.breakpoints.values.md;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!open && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            position: 'absolute',
            top: 16,
            left: {
              xs: 'auto', 
              sm: 'auto', 
              md: 16, 
            },
            right: {
              xs: 16,
              sm: 16, 
              md: 'auto',
            },
            zIndex: 1201,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSmallViewport ? '100%' : drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isSmallViewport ? 'temporary' : 'persistent'}
        anchor={isSmallViewport ? 'bottom' : 'left'}
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ margin: 0 }}>
            Welcome, {user.data?.name || 'anonymous'}!
          </h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navigation.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Link
                href={item.to}
                style={{
                  display: 'flex',
                  textDecoration: 'none',
                  color: 'black',
                  width: '100%',
                }}
              >
                <ListItemIcon
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </Link>
            </ListItem>
          ))}
        </List>
        <LogoutButton />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { md: theme.spacing(3) },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: open ? 0 : isSmallViewport ? 0 : `-${drawerWidth}px`,
        }}
      >
        <h1>{title}</h1>
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
