import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditAdmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [AdmissionData, setAdmissionData] = useState({
        name: '',
        class: '',
        contact: '',
        email: ''
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchAdmission = async () => {
                const docRef = doc(db, 'admission', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAdmissionData(docSnap.data());
                } else {
                    alert('Admission not found');
                    navigate('/admission');
                }
            };
            fetchAdmission();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setAdmissionData({ ...AdmissionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'admission', id);
                await updateDoc(docRef, AdmissionData);
                alert('Admission updated successfully!');
            } else {
                await addDoc(collection(db, 'admission'), AdmissionData);
                alert('Admission Created Sucessfully!');
            }
            navigate('/admission');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Create'} Admission`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Admission Name"
                    name="name"
                    value={AdmissionData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Class"
                    name="class"
                    value={AdmissionData.class}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Contact Number"
                    name="contact"
                    value={AdmissionData.contact}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
               <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={AdmissionData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Admission' : 'Create Admission'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/admission">Back to Admission List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditAdmission;