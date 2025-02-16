import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, TextField, Typography, Alert } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNavigate, Link } from 'react-router-dom';

const FeeStructure = () => {
    const [feeStructures, setFeeStructures] = useState([]);
    const navigate = useNavigate();
    const [newFee, setNewFee] = useState({ className: '', amount: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'feeStructures'), (snapshot) => {
            const feeData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFeeStructures(feeData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this fee structure?')) {
            await deleteDoc(doc(db, 'feeStructures', id));
            alert('Fee structure deleted successfully');
        }
    };

    const handleAddFeeStructure = async () => {
        try {
            await addDoc(collection(db, 'feeStructures'), newFee);
            setNewFee({ className: '', amount: '' });
        } catch (error) {
            setError(error.message);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'className', headerName: 'Class Name', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
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
                        onClick={() => navigate(`/fees/structure/edit/${params.row.id}`)}
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
            <PageHeader title="Fee Structure" />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <TextField
                    label="Class Name"
                    value={newFee.className}
                    onChange={(e) => setNewFee({ ...newFee, className: e.target.value })}
                />
                <TextField
                    label="Amount"
                    type="number"
                    value={newFee.amount}
                    onChange={(e) =>
                        setNewFee({ ...newFee, amount: e.target.value })}
                        />
                        <Button variant="contained" onClick={handleAddFeeStructure}>Add Fee</Button>
                    </Box>
                    <DataGrid
                        rows={feeStructures}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                        // rowCount={feeStructures.length}
                    />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        <Link to="/dashboard">Back to Dashboard</Link>
                    </Typography>
                </Box>
            );
        };
        
        export default FeeStructure;