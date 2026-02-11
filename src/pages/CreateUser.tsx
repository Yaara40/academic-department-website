import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function CreateUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים");
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("משתמש נוצר בהצלחה!");
        navigate("/");
      })
      .catch((err) => {
        const errorMessage =
          err instanceof Error ? err.message : "יצירת המשתמש נכשלה";
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          יצירת משתמש חדש
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleCreateUser}
          sx={{ width: "100%" }}
        >
          <TextField
            label="אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled={loading}
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="סיסמה"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            disabled={loading}
            variant="outlined"
            required
            helperText="הסיסמה חייבת להכיל לפחות 6 תווים"
            sx={{ mb: 2 }}
          />

          <TextField
            label="אימות סיסמה"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            disabled={loading}
            variant="outlined"
            required
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "הסיסמאות אינן תואמות"
                : ""
            }
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              loading ||
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword
            }
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "צור משתמש"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
