import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Input from '../../components/common/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(loginData.email, loginData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom>Login</Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit" sx={{ mb: 2 }}>
                    Login
                </Button>
            </form>
            <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                fullWidth
                sx={{ mt: 2 }}
            >
                Sign In with Google
            </Button>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register</Link>
            </Typography>
        </Box>
    );
};

export default Login;