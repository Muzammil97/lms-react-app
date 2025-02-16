import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, Link, Typography, Alert } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
            const courseData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCourses(courseData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            await deleteDoc(doc(db, 'courses', id));
            alert('Course deleted successfully');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Course Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/courses/edit/${params.row.id}`)}
                        style={{ marginRight: 8 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Box>
            <PageHeader title="Course List" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="contained" onClick={() => navigate('/courses/add')}>
                    Create Course
                </Button>
            </Box>
            <DataGrid
                rows={courses}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                // rowCount={courses.length}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default CourseList;