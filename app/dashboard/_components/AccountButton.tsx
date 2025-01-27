import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import ThemeToggle from '@/app/components/ThemeToggle';
import Link from 'next/link';
import { logout } from '@/app/components/logout/_actions/logout';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import SkeletonWrapper from '@/app/components/SkeletonWrapper';
import { AddAvatar } from '../_actions/addAvatar';
import ImageAvatar from '../_helpers/ImageAvatar';
import { ClickAwayListener, Chip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface AccountButtonProps {
  role: 'USER' | 'ADMIN'; // User role
  plan: 'FREE' | 'SUBSCRIPTION'; // User plan
}

const AccountButton = ({ role, plan }: AccountButtonProps) => {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [profilePicture, setProfilePicture] = React.useState<null | string>(
    null
  );
  const [open, setOpen] = React.useState<boolean | undefined>(true);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: AddAvatar,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Profile Picture Updated');
      } else {
        toast.error(data.message as string);
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred');
    },
  });

  React.useEffect(() => {
    ImageAvatar().then((picture) => setProfilePicture(picture as string));
  }, []);

  React.useEffect(() => {
    setOpen(Boolean(anchor));
  }, [anchor]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      setProfilePicture(URL.createObjectURL(file));
      formData.append('profilePicture', file);
      mutation.mutate(formData);
    }
  };

  const id = open ? 'simple-popper' : undefined;

  // Determine the background color based on the user's role and plan
  const getPopupColor = () => {
    if (role === 'ADMIN') return '#ff4444'; // Red for Admin
    if (plan === 'SUBSCRIPTION') return '#89CFF0'; // Baby blue for Pro Member
    return '';
  };

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (open) {
            setOpen(false);
            setAnchor(null);
          }
        }}
      >
        <div>
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
              <SkeletonWrapper isLoading={mutation.isPending}>
                <AccountCircleIcon fontSize={'large'} />
              </SkeletonWrapper>
            )}
          </div>
          <BasePopup
            id={id}
            open={open}
            anchor={anchor}
            style={{ zIndex: '2' }}
          >
            <PopupBody>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* Display User Role and Plan */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {role === 'ADMIN' ? 'Admin' : 'User'}
                </Typography>
                <Chip
                  label={plan === 'SUBSCRIPTION' ? 'Pro Member' : 'Free Plan'}
                  color={plan === 'SUBSCRIPTION' ? 'primary' : 'default'}
                  sx={{
                    backgroundColor: `${getPopupColor()}`,
                  }}
                  size="small"
                />

                {/* Upgrade to Pro Button (only for non-Pro users) */}
                {plan !== 'SUBSCRIPTION' && (
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'relative',
                      padding: '8px 16px', // Reduced padding for a smaller button
                      borderRadius: '30px', // Keep rounded corners
                      color: 'inherit', // Use inherit to adapt to the current theme
                      fontWeight: 600, // Font weight
                      fontSize: '0.875rem', // Smaller font size
                      boxShadow:
                        'inset 0 1px 0px rgba(white, .1), 0 2px 8px rgba(black, .1)', // Box shadow
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, color 0.3s', // Smooth transition for hover effects
                      '&:hover': {
                        background: '#2A2A2E', // Darker background on hover
                        color: '#FFFFFF', // Change text color to white on hover for visibility
                      },
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '200%',
                        height: '100%',
                        background:
                          'linear-gradient(115deg, rgba(white, 0), rgba(white, .1) 40%, rgba(white, .1) 60%, rgba(white, 0))',
                        transform: 'translateX(-201%)',
                        filter: 'blur(5px)',
                        animation: 'shine 6s linear infinite .5s',
                      },
                    }}
                    onClick={() => {
                      toast.success('Redirecting to upgrade plan...');
                      router.push('/services');
                    }}
                  >
                    Upgrade
                  </Typography>
                )}

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
        </div>
      </ClickAwayListener>
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
