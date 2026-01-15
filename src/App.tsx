import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "./components/AdminHeader";
import UserHeader from "./components/UserHeader";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Admin Pages
import Home from "./pages/Home";
import CoursesManagement from "./pages/CoursesManagement";
import CoursesForm from "./features/courses/components/CoursesForm";
import GrowthManagement from "./pages/GrowthManagement";
import ContactManagement from "./pages/ContactManagement";
import HelpManagement from "./pages/HelpManagement";

// User Pages
import UserHome from "./pages/UserHome";
import UserCourses from "./pages/UserCourses";
import UserContact from "./pages/UserContact.tsx";

const App = () => {
  const location = useLocation();
  const isUserView = location.pathname.startsWith("/user");

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      {isUserView ? <UserHeader /> : <AdminHeader />}

      {/* Sidebar - רק ל-Admin */}
      {!isUserView && <Sidebar />}

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 2.5,
          mr: { xs: 0, md: isUserView ? 0 : "220px" },
          mt: "72px",
        }}
      >
        <Routes>
          {/* User Routes */}
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/courses" element={<UserCourses />} />
          <Route path="/user/contact" element={<UserContact />} />

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
