import { Box, Typography } from "@mui/material";
import HomeList from "../features/home/components/HomeList.tsx";

export default function Home() {
  return (
    <Box sx={{ direction: 'rtl' }}>
  
      <Box sx={{ p: 3 }}>
        <Box sx={{ textAlign: "right", mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>
            ניהול דף הבית
          </Typography>
          <Typography color="text.secondary">
            נהל את כל המידע המוצג בדף הבית
          </Typography>
        </Box>

        <HomeList />
      </Box>
    </Box>
  );
}