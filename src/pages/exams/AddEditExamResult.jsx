import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddEditExamResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [examResult, setExamResult] = useState({
        studentId: '',
        subject: '',
        marks: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchExamResult = async () => {
                const docRef = doc(db, 'examResults', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setExamResult(docSnap.data());
                } else {
                    alert('Exam result not found');
                    navigate('/exams/result');
                }
            };
            fetchExamResult();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) =>
        setExamResult({ ...examResult, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'examResults', id);
                await updateDoc(docRef, examResult);
                alert('Exam result updated successfully!');
            } else {
                await addDoc(collection(db, 'examResults'), examResult);
                alert('Exam result added successfully!');
            }
            navigate('/exams/result');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Add'} Exam Result`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Student ID"
                    name="studentId"
                    value={examResult.studentId}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Subject"
                    name="subject"
                    value={examResult.subject}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Marks"
                    name="marks"
                    type="number"
                    value={examResult.marks}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Result' : 'Add Result'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/exams/result">Back to Exam Result List</Link>
            </Typography>
        </Box>
    );
};

export default AddEditExamResult;