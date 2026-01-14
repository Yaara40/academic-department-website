import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

import type { ContactInfo } from "../../models/Home";
import { getContactInfo, saveContactInfo } from "../../firebase/contactInfo";

export default function ContactForm() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "050-1234567",
    email: "info@example.com",
    address: "רחוב 123, עיר, ישראל",
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
    linkedin: "https://linkedin.com/...",
    youtube: "https://youtube.com/...",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  // טעינה מ-Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getContactInfo();
        if (data) {
          setContactInfo(data);
        }
      } catch (error) {
        console.error("Error loading contact info:", error);
        setSnackSeverity("error");
        setSnackMsg("❌ שגיאה בטעינת הנתונים");
        setSnackOpen(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. טלפון - חובה, פורמט ישראלי בסיסי
    const phoneClean = contactInfo.phone.replace(/\s/g, "");
    if (!phoneClean.trim()) {
      newErrors.phone = "טלפון הוא שדה חובה";
    } else if (!/^0(5[0-8]|7[3-9])-?\d{7}$/.test(phoneClean)) {
      newErrors.phone = "פורמט טלפון לא תקין (לדוגמה: 050-1234567)";
    }

    // 2. אימייל - חובה, פורמט כתובת מייל
    const emailClean = contactInfo.email.trim().toLowerCase();
    if (!emailClean) {
      newErrors.email = "אימייל הוא שדה חובה";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailClean)) {
      newErrors.email = "פורמט אימייל לא תקין (לדוגמה: example@domain.com)";
    }

    // 3. כתובת - חובה
    if (!contactInfo.address.trim()) {
      newErrors.address = "כתובת היא שדה חובה";
    }

    // 4-7. קישורים - אופציונלי, אבל אם מולא חייב URL
    const isValidUrl = (v: string) => /^https?:\/\/.+/i.test(v.trim());

    if (contactInfo.facebook.trim() && !isValidUrl(contactInfo.facebook)) {
      newErrors.facebook = "קישור פייסבוק חייב להתחיל ב-http:// או https://";
    }
    if (contactInfo.instagram.trim() && !isValidUrl(contactInfo.instagram)) {
      newErrors.instagram = "קישור אינסטגרם חייב להתחיל ב-http:// או https://";
    }
    if (contactInfo.linkedin.trim() && !isValidUrl(contactInfo.linkedin)) {
      newErrors.linkedin = "קישור לינקדאין חייב להתחיל ב-http:// או https://";
    }
    if (contactInfo.youtube.trim() && !isValidUrl(contactInfo.youtube)) {
      newErrors.youtube = "קישור יוטיוב חייב להתחיל ב-http:// או https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setSnackSeverity("error");
      setSnackMsg("❌ יש שדות לא תקינים. תקני את השגיאות ונסי שוב.");
      setSnackOpen(true);
      return;
    }

    try {
      setSaving(true);
      await saveContactInfo(contactInfo);
      setSnackSeverity("success");
      setSnackMsg("✅ נשמר ל-Firestore בהצלחה!");
      setSnackOpen(true);
    } catch (error) {
      console.error("Error saving:", error);
      setSnackSeverity("error");
      setSnackMsg("❌ שגיאה בשמירה. נסי שוב.");
      setSnackOpen(true);
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
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
        פרטי התקשרות (טופס)
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {/* טלפון */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PhoneIcon />
          <TextField
            fullWidth
            label="טלפון *"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
            error={Boolean(errors.phone)}
            helperText={errors.phone || "לדוגמה: 050-1234567"}
            type="tel"
            inputProps={{ inputMode: "tel", dir: "ltr" }}
          />
        </Box>

        {/* אימייל */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon />
          <TextField
            fullWidth
            label="אימייל *"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
            error={Boolean(errors.email)}
            helperText={errors.email || "לדוגמה: info@example.com"}
            type="email"
            inputProps={{ inputMode: "email", dir: "ltr" }}
          />
        </Box>

        {/* כתובת */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HomeIcon />
          <TextField
            fullWidth
            label="כתובת *"
            value={contactInfo.address}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, address: e.target.value })
            }
            error={Boolean(errors.address)}
            helperText={errors.address || " "}
          />
        </Box>

        {/* פייסבוק */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FacebookIcon />
          <TextField
            fullWidth
            label="פייסבוק (אופציונלי)"
            value={contactInfo.facebook}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, facebook: e.target.value })
            }
            error={Boolean(errors.facebook)}
            helperText={errors.facebook || "חייב להתחיל ב-http:// או https://"}
            type="url"
            inputProps={{ inputMode: "url", dir: "ltr" }}
          />
        </Box>

        {/* אינסטגרם */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InstagramIcon />
          <TextField
            fullWidth
            label="אינסטגרם (אופציונלי)"
            value={contactInfo.instagram}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, instagram: e.target.value })
            }
            error={Boolean(errors.instagram)}
            helperText={errors.instagram || "חייב להתחיל ב-http:// או https://"}
            type="url"
            inputProps={{ inputMode: "url", dir: "ltr" }}
          />
        </Box>

        {/* לינקדאין */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinkedInIcon />
          <TextField
            fullWidth
            label="לינקדאין (אופציונלי)"
            value={contactInfo.linkedin}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, linkedin: e.target.value })
            }
            error={Boolean(errors.linkedin)}
            helperText={errors.linkedin || "חייב להתחיל ב-http:// או https://"}
            type="url"
            inputProps={{ inputMode: "url", dir: "ltr" }}
          />
        </Box>

        {/* יוטיוב */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <YouTubeIcon />
          <TextField
            fullWidth
            label="יוטיוב (אופציונלי)"
            value={contactInfo.youtube}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, youtube: e.target.value })
            }
            error={Boolean(errors.youtube)}
            helperText={errors.youtube || "חייב להתחיל ב-http:// או https://"}
            type="url"
            inputProps={{ inputMode: "url", dir: "ltr" }}
          />
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          disabled={saving}
          sx={{ mt: 2 }}
        >
          {saving ? "שומר..." : "שמור ל-Firestore"}
        </Button>
      </Box>

      {/* Snackbar הודעות */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
