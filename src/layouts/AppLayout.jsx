import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const AppLayout = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!currentUser) {
        navigate('/login');
        return null;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Navbar />
                {children}
            </Box>
        </Box>
    );
};

export default AppLayout;