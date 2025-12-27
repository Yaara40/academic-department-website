import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function GrowthOptionsForm() {
  const [pageTitle, setPageTitle] = useState("ניהול אפשרויות צמיחה");
  const [pageDescription, setPageDescription] = useState("ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים");

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. כותרת הדף - חובה: 2-80 תווים
    if (!pageTitle.trim()) {
      newErrors.pageTitle = 'כותרת הדף היא שדה חובה';
    } else if (pageTitle.length < 2 || pageTitle.length > 80) {
      newErrors.pageTitle = 'כותרת הדף חייבת להיות בין 2-80 תווים';
    }

    // 2. תיאור הדף - חובה: 10-300 תווים
    if (!pageDescription.trim()) {
      newErrors.pageDescription = 'תיאור הדף הוא שדה חובה';
    } else if (pageDescription.length < 10 || pageDescription.length > 300) {
      newErrors.pageDescription = 'תיאור הדף חייב להיות בין 10-300 תווים';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

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
        label="כותרת הדף (2-80 תווים) *"
        value={pageTitle}
        onChange={(e) => setPageTitle(e.target.value)}
        error={Boolean(errors.pageTitle)}
        helperText={errors.pageTitle || `${pageTitle.length}/80 תווים`}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="תיאור (10-300 תווים) *"
        value={pageDescription}
        onChange={(e) => setPageDescription(e.target.value)}
        error={Boolean(errors.pageDescription)}
        helperText={errors.pageDescription || `${pageDescription.length}/300 תווים`}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />

      <Button 
        variant="contained" 
        onClick={handleSave}
      >
        שמור ל-LocalStorage
      </Button>
    </Box>
  );
}