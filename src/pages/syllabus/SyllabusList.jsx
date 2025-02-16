import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, Typography, Alert, TextField } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNavigate, Link } from 'react-router-dom';

const SyllabusList = () => {
    const [syllabi, setSyllabi] = useState([]);
    const navigate = useNavigate();
    const [newSyllabus, setNewSyllabus] = useState({ className: '', subject: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'syllabi'), (snapshot) => {
            const syllabusData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSyllabi(syllabusData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this syllabus?')) {
            await deleteDoc(doc(db, 'syllabi', id));
            alert('Syllabus deleted successfully');
        }
    };

    const handleAddSyllabus = async () => {
        try {
            await addDoc(collection(db, 'syllabi'), newSyllabus);
            setNewSyllabus({ className: '', subject: '', description: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'className', headerName: 'Class Name', width: 200 },
        { field: 'subject', headerName: 'Subject', width: 150 },
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
                        onClick={() => navigate(`/syllabus/edit/${params.row.id}`)}
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
            <PageHeader title="Syllabus List" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <TextField
                    label="Class Name"
                    value={newSyllabus.className}
                    onChange={(e) => setNewSyllabus({ ...newSyllabus, className: e.target.value })}
                />
                <TextField
                    label="Subject"
                    value={newSyllabus.subject}
                    onChange={(e) => setNewSyllabus({ ...newSyllabus, subject: e.target.value })}
                />
                <TextField
                    label="Description"
                    value={newSyllabus.description}
                    onChange={(e) => setNewSyllabus({ ...newSyllabus, description: e.target.value })}
                />
                <Button variant="contained" onClick={handleAddSyllabus}>Add Syllabus</Button>
            </Box>
            <DataGrid
                rows={syllabi}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                // rowCount={syllabi.length}
            />
            <Typography variant="body2" sx={{ mt: 2 }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default SyllabusList;