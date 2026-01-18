import { Box, Typography } from "@mui/material";
import HomeList from "../features/home/components/HomeList.tsx";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <Box sx={{ direction: "rtl" }}>
      <Box sx={{ p: 3 }}>
        {/* אזור הכותרת המעודכן עם הכפתור */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // זה מה שדוחף צדדים מנוגדים
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* צד ימין: הכותרת */}
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "text.primary" }}
            >
              ניהול דף הבית
            </Typography>
            <Typography color="text.secondary">
              נהל את כל המידע המוצג בדף הבית
            </Typography>
          </Box>

          {/* צד שמאל: הכפתור החדש */}
          <ThemeToggle />
        </Box>

        <HomeList />
      </Box>
    </Box>
  );
}
