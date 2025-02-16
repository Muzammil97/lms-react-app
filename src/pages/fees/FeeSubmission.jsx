import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const FeeSubmission = () => {
    const navigate = useNavigate();
    const [feeData, setFeeData] = useState({
        studentId: '',
        className: '',
        amount: '',
    });
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClasses = async () => {
            const querySnapshot = await getDocs(collection(db, 'classes'));
            const classData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(classData);
        };
        fetchClasses();
    }, []);

    const handleChange = (e) =>
        setFeeData({ ...feeData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await addDoc(collection(db, 'feeSubmissions'), feeData);
            alert('Fee submitted successfully!');
            setFeeData({ studentId: '', className: '', amount: '' }); // Reset form
            navigate('/fees/voucher'); // Redirect to fee voucher
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title="Fee Submission" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Student ID"
                    name="studentId"
                    value={feeData.studentId}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="class-label">Class Name</InputLabel>
                    <Select
                        labelId="class-label"
                        name="className"
                        value={feeData.className}
                        label="Class Name"
                        onChange={handleChange}
                    >
                        {classes.map((cls) => (
                            <MenuItem key={cls.id} value={cls.name}>{cls.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    value={feeData.amount}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    Submit Fee
                </Button>
            </form>
        </Box>
    );
};

export default FeeSubmission;