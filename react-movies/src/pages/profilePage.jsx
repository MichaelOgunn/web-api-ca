
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Typography, Paper, Box } from '@mui/material';

const ProfilePage = () => {
  const { userName } = useContext(AuthContext);

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="h6">
          Welcome, {userName}!
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          This is your profile page. You can view your details and manage your account here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
