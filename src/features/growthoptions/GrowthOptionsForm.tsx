import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getGrowthOptions,
  saveGrowthOptions,
} from "../../firebase/growthOptions";

type SnackState = {
  open: boolean;
  message: string;
  severity: "success" | "error";
};

export default function GrowthOptionsForm() {
  const [pageTitle, setPageTitle] = useState("ניהול אפשרויות צמיחה");
  const [pageDescription, setPageDescription] = useState(
    "ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<SnackState>({
    open: false,
    message: "",
    severity: "success",
  });

  // טעינה מ-Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getGrowthOptions();

        if (data) {
          setPageTitle(data.pageTitle);
          setPageDescription(data.pageDescription);
        }
      } catch (error) {
        console.error("Error loading growth options:", error);
        openSnack("❌ שגיאה בטעינת הנתונים", "error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openSnack = (message: string, severity: SnackState["severity"]) => {
    setSnack({ open: true, message, severity });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!pageTitle.trim()) {
      newErrors.pageTitle = "כותרת הדף היא שדה חובה";
    } else if (pageTitle.length < 2 || pageTitle.length > 80) {
      newErrors.pageTitle = "כותרת הדף חייבת להיות בין 2-80 תווים";
    }

    if (!pageDescription.trim()) {
      newErrors.pageDescription = "תיאור הדף הוא שדה חובה";
    } else if (pageDescription.length < 10 || pageDescription.length > 300) {
      newErrors.pageDescription = "תיאור הדף חייב להיות בין 10-300 תווים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }

    try {
      setSaving(true);
      await saveGrowthOptions({
        pageTitle,
        pageDescription,
      });
      openSnack("✅ נשמר בהצלחה!", "success");
    } catch (error) {
      console.error("Error saving:", error);
      openSnack("❌ שגיאה בשמירה", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: 3,
        p: 3,
        mb: 4,
        bgcolor: "background.paper",
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
        helperText={
          errors.pageDescription || `${pageDescription.length}/300 תווים`
        }
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSave} disabled={saving}>
        {saving ? "שומר..." : "שמור ל-Firestore"}
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
