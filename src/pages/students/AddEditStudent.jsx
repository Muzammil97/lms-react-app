import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';

const AddEditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        class: '',
        contact: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchStudent = async () => {
                const docRef = doc(db, 'students', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setStudent(docSnap.data());
                } else {
                    alert('Student not found');
                    navigate('/students');
                }
            };
            fetchStudent();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) =>
        setStudent({ ...student, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'students', id);
                await updateDoc(docRef, student);
                alert('Student updated successfully!');
            } else {
                await addDoc(collection(db, 'students'), student);
                alert('Student created successfully!');
            }
            navigate('/students');
        } catch (err) {
            setError(err.message); // Correctly set the error state
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Student`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Student Name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Class"
                    name="class"
                    value={student.class}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Contact Number"
                    name="contact"
                    value={student.contact}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Student' : 'Add Student'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/students">Back to Student List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditStudent;