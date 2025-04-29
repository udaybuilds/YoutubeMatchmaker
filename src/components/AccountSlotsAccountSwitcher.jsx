import * as React from 'react';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
// import { SignIn, SignUp } from './';
import { reload,signout } from '../utils/authenticate';
import { useNavigate } from 'react-router-dom';

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export default function AccountSlotsAccountSwitcher() {
 
  const session = React.useContext(SessionContext); 
  const navigate = useNavigate();
  const auth = React.useContext(AuthenticationContext);
  // console.log(session)
  const HandleSignOutClick = async() => {
    // const navigate = useNavigate();
    await signout();
    auth.signOut();
    navigate('/');
  };
  const handleSignInClick = () => {
    navigate('/signin');
  };
  return (
    <AppProvider authentication={auth} session={session}>
    <Account
      slotProps={{
        signInButton: { onClick: handleSignInClick },
        signOutButton: {onClick: HandleSignOutClick},
      }}
    />
    </AppProvider>
  );
}
