// import React, { useState } from 'react';
// import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Input from '../../../components/common/Input';
// import PageHeader from '../../../components/common/PageHeader';

// const TeacherAllocation = () => {
//   const [teacherId, setTeacherId] = useState('');
//   const [classId, setClassId] = useState('');
//   const [subjectId, setSubjectId] = useState('');

//   const handleAllocation = () => {
//     // Implement allocation logic here (e.g., update teacher's assigned classes in Firebase)
//     console.log(`Allocating teacher ${teacherId} to class ${classId} for subject ${subjectId}`);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
//       <PageHeader title="Teacher Allocation" />
//       <Input
//         label="Teacher ID"
//         value={teacherId}
//         onChange={(e) => setTeacherId(e.target.value)}
//       />
//       <FormControl fullWidth>
//         <InputLabel id="class-label">Class</InputLabel>
//         <Select
//           labelId="class-label"
//           value={classId}
//           label="Class"
//           onChange={(e) => setClassId(e.target.value)}
//         >
//           <MenuItem value="1">Class 1</MenuItem>
//           <MenuItem value="2">Class 2</MenuItem>
//           {/* Add more classes as needed */}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel id="subject-label">Subject</InputLabel>
//         <Select
//           labelId="subject-label"
//           value={subjectId}
//           label="Subject"
//           onChange={(e) => setSubjectId(e.target.value)}
//         >
//           <MenuItem value="math">Mathematics</MenuItem>
//           <MenuItem value="english">English</MenuItem>
//           {/* Add more subjects as needed */}
//         </Select>
//       </FormControl>
//       <Button variant="contained" onClick={handleAllocation}>Allocate</Button>
//     </Box>
//   );
// };

// export default TeacherAllocation;