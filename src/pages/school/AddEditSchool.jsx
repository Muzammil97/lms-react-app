import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditSchool = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({
        name: '',
        address: '',
        contact: '',
        email: ''
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchSchool = async () => {
                const docRef = doc(db, 'schools', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSchoolData(docSnap.data());
                } else {
                    alert('School not found');
                    navigate('/schools');
                }
            };
            fetchSchool();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'schools', id);
                await updateDoc(docRef, schoolData);
                alert('School updated successfully!');
            } else {
                await addDoc(collection(db, 'schools'), schoolData);
                alert('School registered successfully!');
            }
            navigate('/schools');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'School'} Registration`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="School Name"
                    name="name"
                    value={schoolData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Address"
                    name="address"
                    value={schoolData.address}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Contact Number"
                    name="contact"
                    value={schoolData.contact}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={schoolData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update School' : 'Register School'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/schools">Back to School List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditSchool;