import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import ThemeToggle from '@/app/components/ThemeToggle';
import Link from 'next/link';
import { logout } from '@/app/components/logout/_actions/logout';

const AccountButton = () => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [profilePicture, setProfilePicture] = React.useState<null | string>(
    null
  );

  React.useEffect(() => {
    const picture = localStorage.getItem('profilePicture');
    if (picture) {
      setProfilePicture(picture);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      localStorage.setItem(
        'profilePicture',
        URL.createObjectURL(file).split(':').slice(1).join('')
      );
    }
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <div onClick={handleClick}>
        {profilePicture ? (
          <img
            src={profilePicture} 
            alt="Profile Picture"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <AccountCircleIcon fontSize={'large'} />
        )}
      </div>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ThemeToggle />
            <label style={{ cursor: 'pointer' }}>
              Avatar
              <input
                key={profilePicture}
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                hidden
              />
            </label>
            <Link
              href={'/dashboard/settings'}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Profile
            </Link>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                localStorage.removeItem('user');
                return logout();
              }}
            >
              Logout
            </div>
          </div>
        </PopupBody>
      </BasePopup>
    </>
  );
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(
  ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `
);

export default AccountButton;
