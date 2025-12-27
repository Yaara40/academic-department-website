import { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import type { ContactInfo } from "../../../models/Home";

export default function ContactInfoForm() {
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

  // טעינה מ-LocalStorage
  useEffect(() => {
    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem('contactInfo');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setContactInfo(parsed);
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
    };
    
    loadFromLocalStorage();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. טלפון - חובה, פורמט מספר טלפון
    if (!contactInfo.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה';
    } else if (!/^0(5[0-8]|7[3-9])-?\d{7}$/.test(contactInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'פורמט טלפון לא תקין (לדוגמה: 050-1234567)';
    }

    // 2. אימייל - חובה, פורמט כתובת מייל
    if (!contactInfo.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(contactInfo.email)) {
      newErrors.email = 'פורמט אימייל לא תקין (לדוגמה: example@domain.com)';
    }

    // 3. כתובת - חובה
    if (!contactInfo.address.trim()) {
      newErrors.address = 'כתובת היא שדה חובה';
    }

    // 4. פייסבוק - אופציונלי, אבל אם מולא חייב להיות URL
    if (contactInfo.facebook.trim() && !/^https?:\/\/.+/.test(contactInfo.facebook)) {
      newErrors.facebook = 'קישור פייסבוק חייב להתחיל ב-http:// או https://';
    }

    // 5. אינסטגרם - אופציונלי, אבל אם מולא חייב להיות URL
    if (contactInfo.instagram.trim() && !/^https?:\/\/.+/.test(contactInfo.instagram)) {
      newErrors.instagram = 'קישור אינסטגרם חייב להתחיל ב-http:// או https://';
    }

    // 6. לינקדאין - אופציונלי, אבל אם מולא חייב להיות URL
    if (contactInfo.linkedin.trim() && !/^https?:\/\/.+/.test(contactInfo.linkedin)) {
      newErrors.linkedin = 'קישור לינקדאין חייב להתחיל ב-http:// או https://';
    }

    // 7. יוטיוב - אופציונלי, אבל אם מולא חייב להיות URL
    if (contactInfo.youtube.trim() && !/^https?:\/\/.+/.test(contactInfo.youtube)) {
      newErrors.youtube = 'קישור יוטיוב חייב להתחיל ב-http:// או https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
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
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            error={Boolean(errors.phone)}
            helperText={errors.phone || 'לדוגמה: 050-1234567'}
          />
        </Box>

        {/* אימייל */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon />
          <TextField
            fullWidth
            label="אימייל *"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email || 'לדוגמה: info@example.com'}
          />
        </Box>

        {/* כתובת */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HomeIcon />
          <TextField
            fullWidth
            label="כתובת *"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
            error={Boolean(errors.address)}
            helperText={errors.address || ' '}
          />
        </Box>

        {/* פייסבוק */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FacebookIcon />
          <TextField
            fullWidth
            label="פייסבוק (אופציונלי)"
            value={contactInfo.facebook}
            onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
            error={Boolean(errors.facebook)}
            helperText={errors.facebook || 'חייב להתחיל ב-http:// או https://'}
          />
        </Box>

        {/* אינסטגרם */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InstagramIcon />
          <TextField
            fullWidth
            label="אינסטגרם (אופציונלי)"
            value={contactInfo.instagram}
            onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
            error={Boolean(errors.instagram)}
            helperText={errors.instagram || 'חייב להתחיל ב-http:// או https://'}
          />
        </Box>

        {/* לינקדאין */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinkedInIcon />
          <TextField
            fullWidth
            label="לינקדאין (אופציונלי)"
            value={contactInfo.linkedin}
            onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
            error={Boolean(errors.linkedin)}
            helperText={errors.linkedin || 'חייב להתחיל ב-http:// או https://'}
          />
        </Box>

        {/* יוטיוב */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <YouTubeIcon />
          <TextField
            fullWidth
            label="יוטיוב (אופציונלי)"
            value={contactInfo.youtube}
            onChange={(e) => setContactInfo({ ...contactInfo, youtube: e.target.value })}
            error={Boolean(errors.youtube)}
            helperText={errors.youtube || 'חייב להתחיל ב-http:// או https://'}
          />
        </Box>

        <Button 
          variant="contained" 
          color="success"
          onClick={handleSave} 
          sx={{ mt: 2 }}
        >
          שמור ל-LocalStorage
        </Button>
      </Box>
    </Box>
  );
}