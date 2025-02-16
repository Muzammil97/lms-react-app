import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import StudentListDashboard from "../components/StudentListDashboard";
import TeacherListDashboard from "../components/TeacherListDashboard";
import CourseListDashboard from "../components/CourseListDashboard";

const Dashboard = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">LMS Dashboard</Typography>
                {/* <DarkModeToggle /> */}
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Students</Typography>
                            <Link to="/students">Manage Students</Link>
                            <StudentListDashboard />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Teachers</Typography>
                            <Link to="/teachers">Manage Teachers</Link>
                            <TeacherListDashboard />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Courses</Typography>
                            <Link to="/courses">Manage Courses</Link>
                            <CourseListDashboard />
                        </CardContent>
                    </Card>
                </Grid>
                {/* Add more dashboard items here */}
            </Grid>
        </Box>
    );
};

export default Dashboard;