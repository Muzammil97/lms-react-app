import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, Typography, Alert } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNavigate, Link } from 'react-router-dom';

const SchoolList = () => {
    const [schools, setSchools] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'schools'), (snapshot) => {
            const schoolData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSchools(schoolData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this school?')) {
            await deleteDoc(doc(db, 'schools', id));
            alert('School deleted successfully');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'School Name', width: 200 },
        { field: 'address', headerName: 'Address', width: 300 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
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
                        onClick={() => navigate(`/school/registration/edit/${params.row.id}`)}
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
            <PageHeader title="School List" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <DataGrid
                rows={schools}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                // rowCount={schools.length}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default SchoolList;