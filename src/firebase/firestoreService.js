import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const studentCollection = collection(db, "students");

// Create Student
export const addStudent = async (student) => {
  const docRef = await addDoc(studentCollection, student);
  return docRef.id;
};

// Get All Students
export const getStudents = async () => {
  const querySnapshot = await getDocs(studentCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update Student
export const updateStudent = async (id, updatedData) => {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, updatedData);
};

// Delete Student
export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
};


const teacherCollection = collection(db, "teachers");

// Create Teacher
export const addTeacher = async (teacher) => {
  const docRef = await addDoc(teacherCollection, teacher);
  return docRef.id;
};

// Get All Teachers
export const getTeachers = async () => {
  const querySnapshot = await getDocs(teacherCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update Teacher
export const updateTeacher = async (id, updatedData) => {
  const teacherDoc = doc(db, "teachers", id);
  await updateDoc(teacherDoc, updatedData);
};

// Delete Teacher
export const deleteTeacher = async (id) => {
  const teacherDoc = doc(db, "teachers", id);
  await deleteDoc(teacherDoc);
};


const classCollection = collection(db, "classes");

// Create Class
export const addClass = async (classData) => {
  const docRef = await addDoc(classCollection, classData);
  return docRef.id;
};

// Get All Classes
export const getClasses = async () => {
  const querySnapshot = await getDocs(classCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update Class
export const updateClass = async (id, updatedData) => {
  const classDoc = doc(db, "classes", id);
  await updateDoc(classDoc, updatedData);
};

// Delete Class
export const deleteClass = async (id) => {
  const classDoc = doc(db, "classes", id);
  await deleteDoc(classDoc);
};
