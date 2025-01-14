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
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
          }}
          type="submit"
        >
          <LogOut style={{ width: '30px', height: '30px', color: 'inherit'}} />
        </IconButton>
      </form>
    </div>
  );
};

export default LogoutButton;
