import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';

const AddEditTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState({
        name: '',
        subject: '',
        contact: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchTeacher = async () => {
                const docRef = doc(db, 'teachers', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTeacher(docSnap.data());
                } else {
                    alert('Teacher not found');
                    navigate('/teachers');
                }
            };
            fetchTeacher();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) =>
        setTeacher({ ...teacher, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'teachers', id);
                await updateDoc(docRef, teacher);
                alert('Teacher updated successfully!');
            } else {
                await addDoc(collection(db, 'teachers'), teacher);
                alert('Teacher added successfully!');
            }
            navigate('/teachers');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Teacher`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Teacher Name"
                    name="name"
                    value={teacher.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Subject"
                    name="subject"
                    value={teacher.subject}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Contact Number"
                    name="contact"
                    value={teacher.contact}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Teacher' : 'Add Teacher'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/teachers">Back to Teacher List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditTeacher;