import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, TextField, Typography, Alert } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNavigate, Link } from 'react-router-dom';

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const [newClass, setNewClass] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'classes'), (snapshot) => {
            const classData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClasses(classData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this class?')) {
            await deleteDoc(doc(db, 'classes', id));
            alert('Class deleted successfully');
        }
    };

    const handleAddClass = async () => {
        try {
            await addDoc(collection(db, 'classes'), newClass);
            setNewClass({ name: '', description: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Class Name', width: 200 },
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
                        onClick={() => navigate(`/classes/edit/${params.row.id}`)}
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
            <PageHeader title="Class List" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <TextField
                    label="Class Name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                />
                <TextField
                    label="Description"
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                />
                <Button variant="contained" onClick={handleAddClass}>Add Class</Button>
            </Box>
            <DataGrid
                rows={classes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                // rowCount={classes.length}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default ClassList;