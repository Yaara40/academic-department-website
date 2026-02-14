import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import AdminHeader from "./components/AdminHeader";
import UserHeader from "./components/UserHeader";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { initGA, logPageView } from "./analytics";

//Admin Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import CoursesManagement from "./pages/CoursesManagement";
import CoursesForm from "./features/courses/components/CoursesForm";
import GrowthManagement from "./pages/GrowthManagement";
import ContactManagement from "./pages/ContactManagement";
import HelpManagement from "./pages/HelpManagement";
import { EventManagementPage } from "./pages/EventManagementPage";  // 👈 חדש

//User Pages
import UserHome from "./pages/UserHome";
import UserCourses from "./pages/UserCourses";
import UserContact from "./pages/UserContact.tsx";
import HelpUser from "./pages/HelpUser.tsx";
import UserGrowth from "./pages/UserGrowth.tsx";
import { PersonalAreaPage } from "./pages/PersonalAreaPage";  // 👈 חדש

const App = () => {
  const location = useLocation();
  const isAdminView = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/admin/login";
  const isCreateUserPage = location.pathname === "/create-admin";

  //Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {!isLoginPage &&
        !isCreateUserPage &&
        (isAdminView ? <AdminHeader /> : <UserHeader />)}

      {isAdminView && !isLoginPage && !isCreateUserPage && <Sidebar />}

      <Box
        component="main"
        sx={{
          flex: 1,
          p: isLoginPage || isCreateUserPage ? 0 : 2.5,
          mr: {
            xs: 0,
            md: isAdminView && !isLoginPage && !isCreateUserPage ? "220px" : 0,
          },
          mt: isLoginPage || isCreateUserPage ? 0 : "72px",
        }}
      >
        <Routes>
          {/* User Routes */}
          <Route path="/user" element={<UserHome />} />
          <Route path="/" element={<UserHome />} />
          <Route path="/user/courses" element={<UserCourses />} />
          <Route path="/user/contact" element={<UserContact />} />
          <Route path="/user/help" element={<HelpUser />} />
          <Route path="/user/growth" element={<UserGrowth />} />
          
          {/* 👇 חדש - אזור אישי */}
          <Route 
            path="/user/personal-area" 
            element={
              <PersonalAreaPage 
                userId="temp-user-123"
                userEmail="candidate@example.com"
              />
            } 
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/create-admin" element={<CreateUser />} />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <CoursesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/new"
            element={
              <ProtectedRoute>
                <CoursesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/edit/:existingCourseId"
            element={
              <ProtectedRoute>
                <CoursesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/growth"
            element={
              <ProtectedRoute>
                <GrowthManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute>
                <ContactManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/help"
            element={
              <ProtectedRoute>
                <HelpManagement />
              </ProtectedRoute>
            }
          />
          
          {/* 👇 חדש - ניהול אירועים */}
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <EventManagementPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;