import { useEffect, useState } from "react";
import { addStudent, updateStudent, getStudents } from "../../firebase/firestoreService";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchStudent = async () => {
      if (isEdit) {
        const students = await getStudents();
        const student = students.find(s => s.id === id);
        if (student) {
          setName(student.name);
          setStudentClass(student.class);
        }
      }
    };
    fetchStudent();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { name, class: studentClass };

    if (isEdit) {
      await updateStudent(id, studentData);
    } else {
      await addStudent(studentData);
    }

    navigate("/students");
  };

  return (
    <Container>
      <Typography variant="h4">{isEdit ? "Edit" : "Add"} Student</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Class" fullWidth value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
        <Button type="submit" variant="contained">{isEdit ? "Update" : "Add"}</Button>
      </form>
    </Container>
  );
};

export default StudentForm;
