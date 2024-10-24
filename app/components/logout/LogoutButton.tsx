import { IconButton } from '@mui/material';
import { LogOut } from 'lucide-mui'; 
import { logout } from './_actions/logout';

const LogoutButton = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem('user');
    return logout();
  };
  return (
    <div style={{ marginTop: 'auto' }}>
      <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <IconButton sx={{ color: 'white' }} type={'submit'}>
          <LogOut style={{ width: '30px', height: '30px', color: 'black'}} />
        </IconButton>
      </form>
    </div>
  );
};

export default LogoutButton;
