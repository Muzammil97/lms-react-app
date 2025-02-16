import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    School as SchoolIcon,
    Book as BookIcon,
    Class as ClassIcon,
    AttachMoney as AttachMoneyIcon,
    AssignmentInd as AssignmentIndIcon,
    Event as EventIcon,
    Subject as SubjectIcon,
    ExpandLess,
    ExpandMore,
    Home as HomeIcon
} from '@mui/icons-material'; // Import icons
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [openStudents, setOpenStudents] = useState(false);
    const [openTeachers, setOpenTeachers] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);
    const [openFees, setOpenFees] = useState(false);
    const [openExams, setOpenExams] = useState(false);
    const [openSyllabus, setOpenSyllabus] = useState(false);
    const [openCourses, setOpenCourses] = useState(false);
    const [openAdmission, setOpenAdmission] = useState(false);

    return (
        <Drawer variant="permanent" sx={{ width: 240 }}>
            <List>
                <ListItem  component={Link} to="/dashboard">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                {/* Students */}
                <ListItem  onClick={() => setOpenStudents(!openStudents)}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                    {openStudents ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openStudents} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/students" sx={{ pl: 4 }}>
                            <ListItemText primary="Student List" />
                        </ListItem>
                        <ListItem  component={Link} to="/students/add" sx={{ pl: 4 }}>
                            <ListItemText primary="Add Student" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Teachers */}
                <ListItem  onClick={() => setOpenTeachers(!openTeachers)}>
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                    {openTeachers ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openTeachers} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/teachers" sx={{ pl: 4 }}>
                            <ListItemText primary="Teacher List" />
                        </ListItem>
                        <ListItem  component={Link} to="/teachers/add" sx={{ pl: 4 }}>
                            <ListItemText primary="Add Teacher" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Classes */}
                <ListItem  onClick={() => setOpenClasses(!openClasses)}>
                    <ListItemIcon>
                        <ClassIcon />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                    {openClasses ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openClasses} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/classes"  sx={{ pl: 4 }}>
                            <ListItemText primary="Class List" />
                        </ListItem>
                        <ListItem  component={Link} to="/classes/create" sx={{ pl: 4 }}>
                            <ListItemText primary="Add Class" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Syllabus */}
                <ListItem  onClick={() => setOpenSyllabus(!openSyllabus)}>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Syllabus" />
                    {openSyllabus ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSyllabus} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/syllabus"  sx={{ pl: 4 }}> 
                            <ListItemText primary="Syllabus List" />
                        </ListItem>
                        <ListItem  component={Link} to="/syllabus/create" sx={{ pl: 4 }}>
                            <ListItemText primary="Create Syllabus" />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Fees */}
                <ListItem  onClick={() => setOpenFees(!openFees)}>
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Fees" />
                    {openFees ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openFees} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/fees/structure" sx={{ pl: 4 }}>
                            <ListItemText primary="Fee Structure" />
                        </ListItem>
                        <ListItem  component={Link} to="/fees/submission" sx={{ pl: 4 }}>
                            <ListItemText primary="Fee Submission" />
                        </ListItem>
                        <ListItem  component={Link} to="/fees/voucher" sx={{ pl: 4 }}>
                            <ListItemText primary="Fee Voucher" />
                        </ListItem>
                    </List>
                </Collapse>
                 {/* Courses */}
                <ListItem  onClick={() => setOpenCourses(!openCourses)}>
                    <ListItemIcon>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                    {openCourses ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCourses} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/courses"  sx={{ pl: 4 }}>
                            <ListItemText primary="Courses List" />
                        </ListItem>
                        <ListItem  component={Link} to="/courses/create" sx={{ pl: 4 }}>
                            <ListItemText primary="Create Courses" />
                        </ListItem>
                    </List>
                </Collapse>
                {/*Exams*/}
                <ListItem  onClick={() => setOpenExams(!openExams)}>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Exams" />
                    {openExams ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openExams} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/exams/schedule" sx={{ pl: 4 }}>
                            <ListItemText primary="Schedule Exam" />
                        </ListItem>
                        <ListItem  component={Link} to="/exams/result" sx={{ pl: 4 }}>
                            <ListItemText primary="Exams Result" />
                        </ListItem>
                    </List>
                </Collapse>
                {/*Addmissions */}
                <ListItem  onClick={() => setOpenAdmission(!openAdmission)}>
                    <ListItemIcon>
                        <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admissions" />
                    {openAdmission ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAdmission} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem  component={Link} to="/admission"  sx={{ pl: 4 }}>
                            <ListItemText primary="Schedule Admission" />
                        </ListItem>
                        <ListItem  component={Link} to="/admission/list" sx={{ pl: 4 }}>
                            <ListItemText primary="Admission List" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default Sidebar;