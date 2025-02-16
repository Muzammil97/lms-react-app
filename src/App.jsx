import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from "./pages/School/Registration";
import CreateSyllabus from "./pages/Syllabus/CreateSyllabus";
import SyllabusList from "./pages/Syllabus/SyllabusList";
import ClassForm from "./pages/Classes/ClassForm";
import ClassList from "./pages/Classes/ClassList";
import FeeStructure from "./pages/Fees/FeeStructure";
import FeeSubmission from "./pages/Fees/FeeSubmission";
import FeeVoucher from "./pages/Fees/FeeVoucher";
import AdmissionForm from "./pages/admission/AdmissionForm";
import AddEditAdmission from "./pages/admission/AddEditAdmission.jsx";
import AdmissionList from "./pages/admission/AdmissionList.jsx";

import ScheduleExam from "./pages/Exams/ScheduleExam";
import ExamResultList from "./pages/Exams/ExamResultList";
import AddEditExamResult from "./pages/Exams/AddEditExamResult";
import StudentList from "./pages/Students/StudentList";
import AddEditStudent from "./pages/Students/AddEditStudent";
import TeacherList from "./pages/Teachers/TeacherList";
import AddEditTeacher from "./pages/Teachers/AddEditTeacher";
import SubjectList from "./pages/Subjects/SubjectList";
import AddEditSubject from "./pages/Subjects/AddEditSubject";
import { useAuth } from "./contexts/AuthContext";
import CourseList from "./pages/Courses/CourseList";
import AddEditCourse from "./pages/Courses/AddEditCourse";
// import { AdmissionList } from './pages/admission/AddEditAdmission.jsx';
import NotFound from "./pages/NotFound";

function App() {
    const AuthRoute = ({ children }) => {
        const { currentUser } = useAuth();
        return currentUser ? <Navigate to="/dashboard" /> : children;
    };
    return (
        <AuthProvider>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route path="/register" element={
                        <AuthRoute>
                            <Register/>
                        </AuthRoute>
                    } />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <Dashboard />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/students"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <StudentList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/students/add"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditStudent />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/students/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditStudent />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/teachers"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <TeacherList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                      <Route
                        path="/teachers/add"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditTeacher />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/teachers/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditTeacher />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/subjects"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <SubjectList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/subjects/add"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditSubject />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/subjects/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditSubject />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/school/registration"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <Registration />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/school/registration/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <Registration />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/syllabus/create"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <CreateSyllabus />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/syllabus"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <SyllabusList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/classes/create"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <ClassForm />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                       <Route
                        path="/classes"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <ClassList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                       <Route
                        path="/fees/structure"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <FeeStructure />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/fees/structure/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <FeeStructure />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />

                       <Route
                        path="/fees/submission"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <FeeSubmission />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                       <Route
                        path="/fees/voucher"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <FeeVoucher />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                       <Route
                        path="/admission"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AdmissionForm />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />

<Route
            path="/admission/list"
            element={
                <ProtectedRoute>
                    <AppLayout>
                        <AdmissionList />
                    </AppLayout>
                </ProtectedRoute>
            }
        />

<Route
                        path="/admissions/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditAdmission />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />


<Route
                        path="/syllabus/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <CreateSyllabus />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
   <Route
                        path="/classes/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <ClassForm />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />

   
                       <Route
                        path="/exams/schedule"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <ScheduleExam />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                           <Route
                        path="/exams/result"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <ExamResultList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/exams/result/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditExamResult />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/courses"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <CourseList />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/courses/create"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditCourse />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                     <Route
                        path="/courses/edit/:id"
                        element={
                            <ProtectedRoute>
                                <AppLayout>
                                    <AddEditCourse />
                                </AppLayout>
                            </ProtectedRoute>
                        }
                    />
                       <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;