import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function GrowthOptionsForm() {
  const [pageTitle, setPageTitle] = useState("ניהול אפשרויות צמיחה");
  const [pageDescription, setPageDescription] = useState("ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים");

  const handleSave = () => {
    localStorage.setItem("growthHeader", JSON.stringify({ pageTitle, pageDescription }));
    alert("✅ נשמר!");
  };

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: 3,
        p: 3,
        mb: 4,
        bgcolor: "#fff",
        direction: "rtl",
      }}
    >
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
        עריכת כותרת ותיאור
      </Typography>
      
      <TextField
        label="כותרת"
        value={pageTitle}
        onChange={(e) => setPageTitle(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        label="תיאור"
        value={pageDescription}
        onChange={(e) => setPageDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />
      
      <Button variant="contained" onClick={handleSave}>
        שמור
      </Button>
    </Box>
  );
}