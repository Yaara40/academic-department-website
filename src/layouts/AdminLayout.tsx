import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/Sidebar"; 

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      {}
      <AdminHeader />

      {}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      {}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: "64px",      
          mr: { md: "240px" },
          bgcolor: "background.default" 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}