import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/UserSidebar";
import UserSidebar from "./components/UserSidebar";

// Admin Pages
import Home from "./pages/Home";
import CoursesManagement from "./pages/CoursesManagement";
import CoursesForm from "./features/courses/components/CoursesForm";
import GrowthManagement from "./pages/GrowthManagement";
import ContactManagement from "./pages/ContactManagement";
import HelpManagement from "./pages/HelpManagement";

// User Pages
import UserHome from "./pages/UserHome";

const App = () => {
  const location = useLocation();
  const isUserView = location.pathname.startsWith("/user");

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Sidebar - מחליף בין מנהל למשתמש */}
      {isUserView ? <UserSidebar /> : <Sidebar />}

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 2.5,
          mr: { xs: 0, md: "220px" },
          mt: "72px",
        }}
      >
        <Routes>
          {/* User Routes */}
          <Route path="/user" element={<UserHome />} />

          {/* Admin Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/courses" element={<CoursesManagement />} />
          <Route path="/admin/courses/new" element={<CoursesForm />} />
          <Route path="/admin/growth" element={<GrowthManagement />} />
          <Route path="/admin/contact" element={<ContactManagement />} />
          <Route path="/admin/help" element={<HelpManagement />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
};

export default App;
