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

  const handleSave = () => {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PhoneIcon />
          <TextField
            fullWidth
            label="טלפון"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon />
          <TextField
            fullWidth
            label="אימייל"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HomeIcon />
          <TextField
            fullWidth
            label="כתובת"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FacebookIcon />
          <TextField
            fullWidth
            label="פייסבוק"
            value={contactInfo.facebook}
            onChange={(e) => setContactInfo({ ...contactInfo, facebook: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <InstagramIcon />
          <TextField
            fullWidth
            label="אינסטגרם"
            value={contactInfo.instagram}
            onChange={(e) => setContactInfo({ ...contactInfo, instagram: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LinkedInIcon />
          <TextField
            fullWidth
            label="לינקדאין"
            value={contactInfo.linkedin}
            onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <YouTubeIcon />
          <TextField
            fullWidth
            label="יוטיוב"
            value={contactInfo.youtube}
            onChange={(e) => setContactInfo({ ...contactInfo, youtube: e.target.value })}
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