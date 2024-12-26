import { IconButton, useTheme } from '@mui/material';
import { LogOut } from 'lucide-mui';
import { logout } from './_actions/logout';

const LogoutButton = () => {
  const theme = useTheme(); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem('user');
    return logout();
  };

  return (
    <div style={{ marginTop: 'auto' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
        <IconButton
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.background.default, 
            },
          }}
          type="submit"
        >
          <LogOut style={{ width: '30px', height: '30px', color: 'inherit' }} />
        </IconButton>
      </form>
    </div>
  );
};

export default LogoutButton;
