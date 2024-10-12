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

const drawerWidth = 240;

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('Home Content');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTitle = (title: string) => {
        setTitle(title ? title : 'Home Content');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!open && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1201 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
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
          <h2>Welcome, [Username]!</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <List style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { text: 'Add Book', icon: <AddBoxIcon />, to: '/dashboard/add' },
            { text: 'Current Books', icon: <BookIcon />, to: '/dashboard/current-books' }, // might change to something more unique
            { text: 'Send Books', icon: <SendIcon />, to: '/dashboard/send' },
            {
              text: 'Borrow Books',
              icon: <ImportContactsIcon />,
              to: 'borrow',
            },
            { text: 'Profile', icon: <AccountCircleIcon />, to: '/dashboard/settings' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <Link
                style={{
                  display: 'flex',
                  textDecoration: 'none',
                  color: 'black',
                }}
                href={`${item.to}`}
                onClick={() => handleTitle(item.text)}
              >
                <ListItemIcon
                  style={{
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
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}
      >
        <h1>{title}</h1>
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
