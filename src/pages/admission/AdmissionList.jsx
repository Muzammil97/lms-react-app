// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../../../firebase/firebaseConfig';
// import DataGrid from '../../../components/common/DataGrid';
// import { Button, Box, Typography } from '@mui/material';
// import PageHeader from '../../../components/common/PageHeader';
// import { useNavigate, Link } from 'react-router-dom';

// const AdmissionList = () => {
//     const [admissions, setAdmissions] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'admissions'), (snapshot) => {
//             const AdmissionData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setAdmissions(AdmissionData);
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this Admission?')) {
//             await deleteDoc(doc(db, 'admissions', id));
//             alert('Admission deleted successfully');
//         }
//     };

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'name', headerName: 'Admission Name', width: 200 },
//         { field: 'class', headerName: 'Class', width: 150 },
//         { field: 'contact', headerName: 'Contact', width: 150 },
//         { field: 'email', headerName: 'Email', width: 150 },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 200,
//             renderCell: (params) => (
//                 <div>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         size="small"
//                         onClick={() => navigate(`/admissions/edit/${params.row.id}`)}
//                         style={{ marginRight: 8 }}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         onClick={() => handleDelete(params.row.id)}
//                     >
//                         Delete
//                     </Button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <Box>
//             <PageHeader title="Admission List">
//                 <Button variant="contained" onClick={() => navigate('/admissions/add')}>
//                     Create Admission
//                 </Button>
//             </PageHeader>
//             <DataGrid
//                 rows={admissions}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5, 10, 20]}
//                 autoHeight
//             />
//             <Typography variant="body2" sx={{ mt: 2 }}>
//                 <Link to="/dashboard">Back to Dashboard</Link>
//             </Typography>
//         </Box>
//     );
// };

// export default AdmissionList;

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import DataGrid from '../../../components/common/DataGrid';
import { Button, Box, Typography, Alert } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { Link, useNavigate } from 'react-router-dom';

const AdmissionList = () => {
    const [admissions, setAddmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'admissions'), (snapshot) => {
            const AdmissionData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAddmissions(AdmissionData);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this addmission?')) {
            await deleteDoc(doc(db, 'admissions', id));
            alert('Addmission deleted successfully');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Addmission Name', width: 200 },
        { field: 'class', headerName: 'Class', width: 150 },
        { field: 'contact', headerName: 'Contact', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
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
                        onClick={() => navigate(`/admission/edit/${params.row.id}`)}
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
        <Box >
            <PageHeader title="Addmission List">
                <Button variant="contained" onClick={() => navigate('/admission')}>
                    Create Addmission
                </Button>
            </PageHeader>
            <DataGrid
                rows={admissions}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                rowCount={admissions.length}
            />
             <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                <Link to="/dashboard">Back to Dashboard</Link>
            </Typography>
        </Box>
    );
};

export default AdmissionList;