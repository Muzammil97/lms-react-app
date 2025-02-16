import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import Input from '../../../components/common/Input';
import PageHeader from '../../../components/common/PageHeader';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ScheduleExam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        subject: '',
        date: '',
        time: '',
        class: '',
    });
    const [error, setError] = useState('');
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            const fetchExam = async () => {
                const docRef = doc(db, 'exams', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setExamData(docSnap.data());
                } else {
                    alert('Exam not found');
                    navigate('/exams/schedule');
                }
            };
            fetchExam();
        }
    }, [id, isEditMode, navigate]);

    const handleChange = (e) =>
        setExamData({ ...examData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditMode) {
                const docRef = doc(db, 'exams', id);
                await updateDoc(docRef, examData);
                alert('Exam scheduled successfully!');
            } else {
                await addDoc(collection(db, 'exams'), examData);
                alert('Exam scheduled successfully!');
            }
            navigate('/exams/result');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
            <PageHeader title={`${isEditMode ? 'Edit' : 'Schedule'} Exam`} />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <Input
                    label="Subject"
                    name="subject"
                    value={examData.subject}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={examData.date}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Time"
                    name="time"
                    type="time"
                    value={examData.time}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Input
                    label="Class"
                    name="class"
                    value={examData.class}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                    {isEditMode ? 'Update Exam' : 'Schedule Exam'}
                </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/exams/schedule">Back to Exam List</Link>
            </Typography>
        </Box>
    );
};

export default ScheduleExam;