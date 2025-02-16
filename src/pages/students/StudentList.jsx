import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, Typography } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { Link, useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
            const studentData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStudents(studentData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await deleteDoc(doc(db, 'students', id));
            alert('Student deleted successfully');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Student Name', width: 200 },
        { field: 'class', headerName: 'Class', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/students/edit/${params.row.id}`)}
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
            <PageHeader title="Student List">
                <Button variant="contained" onClick={() => navigate('/students/add')}>
                    Create Student
                </Button>
            </PageHeader>
            <DataGrid
                rows={students}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
            />
 <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default StudentList;