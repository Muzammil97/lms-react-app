import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { List, ListItem, ListItemText } from '@mui/material';

const TeacherListDashboard = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const querySnapshot = await getDocs(collection(db, 'teachers'));
            const teacherData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTeachers(teacherData);
        };
        fetchTeachers();
    }, []);

    return (
        <List>
            {teachers.slice(0, 5).map((teacher) => ( // Display only the first 5 teachers
                <ListItem key={teacher.id}>
                    <ListItemText primary={teacher.name} secondary={teacher.subject} />
                </ListItem>
            ))}
        </List>
    );
};

export default TeacherListDashboard;