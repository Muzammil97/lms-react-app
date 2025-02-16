import { useEffect, useState } from "react";
import { addTeacher, updateTeacher, getTeachers } from "../../firebase/firestoreService";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TeacherForm = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchTeacher = async () => {
      if (isEdit) {
        const teachers = await getTeachers();
        const teacher = teachers.find(t => t.id === id);
        if (teacher) {
          setName(teacher.name);
          setSubject(teacher.subject);
        }
      }
    };
    fetchTeacher();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherData = { name, subject };

    if (isEdit) {
      await updateTeacher(id, teacherData);
    } else {
      await addTeacher(teacherData);
    }

    navigate("/teachers");
  };

  return (
    <Container>
      <Typography variant="h4">{isEdit ? "Edit" : "Add"} Teacher</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Subject" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Button type="submit" variant="contained">{isEdit ? "Update" : "Add"}</Button>
      </form>
    </Container>
  );
};

export default TeacherForm;
