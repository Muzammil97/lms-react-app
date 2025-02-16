// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
// import { db } from '../../../firebase/firebaseConfig';
// import DataGrid from '../../../components/common/DataGrid';
// import { Button, Box, TextField, Typography, Alert } from '@mui/material';
// import PageHeader from '../../../components/common/PageHeader';

// const ExamResult = () => {
//     const [examResults, setExamResults] = useState([]);
//     const [newResult, setNewResult] = useState({ studentId: '', subject: '', marks: '' });
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const unsubscribe = onSnapshot(collection(db, 'examResults'), (snapshot) => {
//             const resultData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setExamResults(resultData);
//         });

//         return () => unsubscribe();
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this result?')) {
//             await deleteDoc(doc(db, 'examResults', id));
//             alert('Exam result deleted successfully');
//         }
//     };

//     const handleAddResult = async () => {
//         try {
//             await addDoc(collection(db, 'examResults'), newResult);
//             setNewResult({ studentId: '', subject: '', marks: '' });
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'studentId', headerName: 'Student ID', width: 100 },
//         { field: 'subject', headerName: 'Subject', width: 100 },
//         { field: 'marks', headerName: 'Marks', width: 70 },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 120,
//             renderCell: (params) => (
//                 <Button
//                     variant="contained"
//                     color="error"
//                     size="small"
//                     onClick={() => handleDelete(params.row.id)}
//                 >
//                     Delete
//                 </Button>
//             ),
//         },
//     ];

//     return (
//         <Box>
//             <PageHeader title="Exam Results" />
//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//             <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
//                 <TextField
//                     label="Student ID"
//                     value={newResult.studentId}
//                     onChange={(e) => setNewResult({ ...newResult, studentId: e.target.value })}
//                 />
//                 <TextField
//                     label="Subject"
//                     value={newResult.subject}
//                     onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
//                 />
//                 <TextField
//                     label="Marks"
//                     type="number"
//                     value={newResult.marks}
//                     onChange={(e) => setNewResult({ ...newResult, marks: e.target.value })}
//                 />
//                 <Button variant="contained" onClick={handleAddResult}>Add Result</Button>
//             </Box>
//             <DataGrid
//                 rows={examResults}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5, 10, 20]}
//                 autoHeight
//                 rowCount={examResults.length}
//             />
//         </Box>
//     );
// };

// export default ExamResult;



