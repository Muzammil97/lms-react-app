import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Input from '../../components/common/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';  // Corrected path
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(registerData.email, registerData.password);
            navigate('/dashboard');  // Redirect to dashboard on successful registration
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h4" align="center" gutterBottom>Register</Typography>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    value={registerData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        name="role"
                        value={registerData.role}
                        label="Role"
                        onChange={handleChange}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Box>
    );
};

export default Register;