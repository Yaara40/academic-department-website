import { Box, Typography } from "@mui/material";
import ContactList from "../features/contact/ContactList";
import ContactForm from "../features/contact/ContactForm";

export default function ContactManagement() {
  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* כותרת */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול השארת פרטים
        </Typography>
        <Typography color="text.secondary">
          צפה ונהל את הפניות מהמועמדים
        </Typography>
      </Box>

      {/* סטטיסטיקות + טבלה */}
      <ContactList />

      {/* טופס הגדרות */}
      <ContactForm />
    </Box>
  );
}