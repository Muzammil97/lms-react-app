import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ClassForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchClass = async () => {
                const docRef = doc(db, 'classes', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setClassData(docSnap.data());
                } else {
                    alert('Class not found');
                    navigate('/classes');
                }
            };
            fetchClass();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setClassData({ ...classData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'classes', id);
                await updateDoc(docRef, classData);
                alert('Class updated successfully!');
            } else {
                await addDoc(collection(db, 'classes'), classData);
                alert('Class created successfully!');
            }
            navigate('/classes');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Class`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Class Name"
                    name="name"
                    value={classData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={classData.description}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Class' : 'Add Class'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/classes">Back to Class List</Link>
            </Typography>
        </Box>
    );
};

export default ClassForm;