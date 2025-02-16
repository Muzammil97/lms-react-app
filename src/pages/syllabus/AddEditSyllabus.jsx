import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditSyllabus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [syllabusData, setSyllabusData] = useState({
        className: '',
        subject: '',
        description: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchSyllabus = async () => {
                const docRef = doc(db, 'syllabi', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSyllabusData(docSnap.data());
                } else {
                    alert('Syllabus not found');
                    navigate('/syllabus');
                }
            };
            fetchSyllabus();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) => {
        setSyllabusData({ ...syllabusData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'syllabi', id);
                await updateDoc(docRef, syllabusData);
                alert('Syllabus updated successfully!');
            } else {
                await addDoc(collection(db, 'syllabi'), syllabusData);
                alert('Syllabus created successfully!');
            }
            navigate('/syllabus');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Create'} Syllabus`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Class Name"
                    name="className"
                    value={syllabusData.className}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Subject"
                    name="subject"
                    value={syllabusData.subject}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={syllabusData.description}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Syllabus' : 'Create Syllabus'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/syllabus">Back to Syllabus List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditSyllabus;