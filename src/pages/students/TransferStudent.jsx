// import React, { useState } from 'react';
// import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Input from '../../components/common/Input';

// const TransferStudent = () => {
//   const [studentId, setStudentId] = useState('');
//   const [newClass, setNewClass] = useState('');

//   const handleTransfer = () => {
//     // Implement transfer logic here (e.g., update student's class in Firebase)
//     console.log(`Transferring student ${studentId} to class ${newClass}`);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
//       <h2>Transfer Student</h2>
//       <Input
//         label="Student ID"
//         value={studentId}
//         onChange={(e) => setStudentId(e.target.value)}
//       />
//       <FormControl fullWidth>
//         <InputLabel id="new-class-label">New Class</InputLabel>
//         <Select
//           labelId="new-class-label"
//           value={newClass}
//           label="New Class"
//           onChange={(e) => setNewClass(e.target.value)}
//         >
//           <MenuItem value="1">Class 1</MenuItem>
//           <MenuItem value="2">Class 2</MenuItem>
//           {/* Add more classes as needed */}
//         </Select>
//       </FormControl>
//       <Button variant="contained" onClick={handleTransfer}>Transfer</Button>
//     </Box>
//   );
// };

// export default TransferStudent;