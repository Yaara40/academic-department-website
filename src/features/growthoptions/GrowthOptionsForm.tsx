import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function GrowthOptionsForm() {
  const [pageTitle, setPageTitle] = useState("ניהול אפשרויות צמיחה");
  const [pageDescription, setPageDescription] = useState("ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים");

  // טעינה מ-LocalStorage
  useEffect(() => {
    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem('growthHeader');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.pageTitle) setPageTitle(parsed.pageTitle);
          if (parsed.pageDescription) setPageDescription(parsed.pageDescription);
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
    };
    
    loadFromLocalStorage();
  }, []);

  const handleSave = () => {
    localStorage.setItem("growthHeader", JSON.stringify({ pageTitle, pageDescription }));
    alert("✅ נשמר ל-LocalStorage!");
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
        label="כותרת הדף"
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
        שמור ל-LocalStorage
      </Button>
    </Box>
  );
}