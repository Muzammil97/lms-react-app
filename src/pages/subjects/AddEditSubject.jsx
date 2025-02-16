import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';

const AddEditSubject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchSubject = async () => {
                const docRef = doc(db, 'subjects', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSubject(docSnap.data());
                } else {
                    alert('Subject not found');
                    navigate('/subjects');
                }
            };
            fetchSubject();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) =>
        setSubject({ ...subject, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'subjects', id);
                await updateDoc(docRef, subject);
                alert('Subject updated successfully!');
            } else {
                await addDoc(collection(db, 'subjects'), subject);
                alert('Subject added successfully!');
            }
            navigate('/subjects');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Subject`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Subject Name"
                    name="name"
                    value={subject.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Description"
                    name="description"
                    value={subject.description}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Subject' : 'Add Subject'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/subjects">Back to Subject List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditSubject;