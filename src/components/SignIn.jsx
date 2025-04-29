import * as React from 'react';
import bcrypt from "bcryptjs";
import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../utils/authenticate';
import { AuthenticationContext } from '@toolpad/core';

export default function SignIn({ setSession, onSignInComplete }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate(); // Navigation hook
  const auth = React.useContext(AuthenticationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to your API
      // Hash the password before sending to the backend
      // const saltRounds = 10;
      // const hashedPassword = await bcrypt.hash(password, saltRounds);

      const response = await authenticate({ email, password });
      console.log(response);
      // Check if the response contains a token and user data
        if (response?.token) {
          console.log("Token received:", response.token);
          console.log("User data:", response.data);

          // Prepare session data from the response
          const sessionData = {
            user: {
              name: response.data.name,  // Since the user data is directly inside `data`
              email: response.data.email,
              image: response.data.image,
            },
          };
          console.log("In Signin What we see\n")
          console.log(sessionData)

          auth.signIn(sessionData);
          // auth.signOut();
          navigate('/');  // Redirect to the dashboard or home page
        }
   else {
        setError(response?.message || 'Invalid credentials'); // Display error from API
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed or User Not Found. Please try again.');
    }
  };

  return (
    <Box
      minHeight="100vh"  // Take the full height of the screen
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(18, 18, 18, 0.8)"  // Dark background with opacity for overlay effect
      position="absolute"  // Absolute positioning to overlay the entire screen
      top={0} left={0} right={0} bottom={0}  // Cover the full screen
      zIndex={9999}  // Ensure it sits on top of everything (including the navbar)
      px={2}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth="600px"
        p={4}
        borderRadius={2}
        bgcolor="#1f1f1f"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
      >
        {/* Left Section */}
        <Box flex={1} p={2} textAlign="center">
            <Typography color="#fff" variant="h4" fontWeight="bold" mb={2}>
              Welcome Back!
            </Typography>
            <Typography color="gray" variant="body1" mb={2}>
              Please sign in to continue
            </Typography>
            <Typography color="gray" variant="body2">
              Don't have an account?  
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 1, textTransform: 'none', borderRadius: '8px' }}
              onClick={() => navigate('/signup')} // Redirects to the signup page
            >
              Sign Up
            </Button>
        </Box>
  
        {/* Right Section - Login Form */}
        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={3} flex={1} p={2}>
          {error && <Typography color="error" variant="body2" textAlign="center">{error}</Typography>}
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontSize: '16px', textTransform: 'none', borderRadius: '8px' }}
          >
            Sign In
          </Button>
        </Box>
      </Stack>
    </Box>
  );  
}