import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchCourse = async () => {
                const docRef = doc(db, 'courses', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCourseData(docSnap.data());
                } else {
                    alert('Course not found');
                    navigate('/courses');
                }
            };
            fetchCourse();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'courses', id);
                await updateDoc(docRef, courseData);
                alert('Course updated successfully!');
            } else {
                await addDoc(collection(db, 'courses'), courseData);
                alert('Course created successfully!');
            }
            navigate('/courses');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Course`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Course Name"
                    name="name"
                    value={courseData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={courseData.description}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Course' : 'Add Course'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/courses">Back to Course List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditCourse;