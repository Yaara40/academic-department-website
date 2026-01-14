import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";

export default function UserLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UserHeader />
      {/* תוכן הדף - פרוס לרוחב מלא */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: "80px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}