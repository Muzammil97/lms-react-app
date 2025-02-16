import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container, TextField, Button, Typography } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      alert("Signup Successful! Now you can log in.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Typography variant="h4">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField 
        label="Email" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField 
        label="Password" 
        type="password" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>
    </Container>
  );
};

export default Signup;
