import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditFeeStructure = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feeData, setFeeData] = useState({
        className: '',
        amount: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchFeeStructure = async () => {
                const docRef = doc(db, 'feeStructures', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFeeData(docSnap.data());
                } else {
                    alert('Fee Structure not found');
                    navigate('/fees/structure');
                }
            };
            fetchFeeStructure();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setFeeData({ ...feeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'feeStructures', id);
                await updateDoc(docRef, feeData);
                alert('Fee structure updated successfully!');
            } else {
                await addDoc(collection(db, 'feeStructures'), feeData);
                alert('Fee structure added successfully!');
            }
            navigate('/fees/structure');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Fee Structure`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Class Name"
                    name="className"
                    value={feeData.className}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    value={feeData.amount}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Fee' : 'Add Fee'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/fees/structure">Back to Fee Structure List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditFeeStructure;