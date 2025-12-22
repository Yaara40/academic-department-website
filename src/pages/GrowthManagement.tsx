import { Box, Typography } from "@mui/material";
import GrowthOptionsForm from "../features/growthoptions/GrowthOptionsForm";
import GrowthOptionList from "../features/growthoptions/GrowthOptionList";

export default function GrowthManagement() {
  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* 1. כותרת */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול אפשרויות צמיחה
        </Typography>
        <Typography color="text.secondary">
          ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים
        </Typography>
      </Box>

      {/* 2. טופס עריכה */}
      <GrowthOptionsForm />

      {/* 3. כרטיסים + 4. טבלה */}
      <GrowthOptionList />
    </Box>
  );
}