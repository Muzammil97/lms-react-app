import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { List, ListItem, ListItemText } from '@mui/material';

const CourseListDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, 'courses'));
            const courseData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCourses(courseData);
        };
        fetchCourses();
    }, []);

    return (
        <List>
            {courses.slice(0, 5).map((course) => ( // Display only the first 5 courses
                <ListItem key={course.id}>
                    <ListItemText primary={course.name} secondary={course.description} />
                </ListItem>
            ))}
        </List>
    );
};

export default CourseListDashboard; 