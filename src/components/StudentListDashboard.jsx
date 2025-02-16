import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { List, ListItem, ListItemText } from '@mui/material';

const StudentListDashboard = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const querySnapshot = await getDocs(collection(db, 'students'));
            const studentData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStudents(studentData);
        };
        fetchStudents();
    }, []);

    return (
        <List>
            {students.slice(0, 5).map((student) => ( // Display only the first 5 students
                <ListItem key={student.id}>
                    <ListItemText primary={student.name} secondary={student.class} />
                </ListItem>
            ))}
        </List>
    );
};

export default StudentListDashboard;