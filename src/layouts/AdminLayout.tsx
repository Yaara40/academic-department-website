import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/Sidebar"; // ✅ עכשיו הקובץ קיים ותקין!

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {/* 1. הדר עליון */}
      <AdminHeader />

      {/* 2. סרגל צד ימני (מוצג רק במחשב) */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      {/* 3. תוכן הדף */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: "64px",      // מרווח מלמעלה (גובה ההדר)
          mr: { md: "240px" }, // מרווח מימין (רוחב הסרגל) כדי שהתוכן לא יוסתר
          bgcolor: "background.default" 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}