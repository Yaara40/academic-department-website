import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import HelpUser from "./pages/HelpUser";

// ייבוא הדפים שלך (אל תשני את זה, זה מה שעובד אצלך)
import Home from "./pages/Home"; 
import CoursesManagement from "./pages/CoursesManagement";
import CoursesForm from "./features/courses/components/CoursesForm";
import GrowthManagement from "./pages/GrowthManagement";
import ContactManagement from "./pages/ContactManagement";
import HelpManagement from "./pages/HelpManagement";
import UserHome from "./pages/UserHome";

const App = () => {
  return (
    <>
      <Routes>
        {/* === מסכי ניהול (Admin) === */}
        {/* כל מה שפה יקבל AdminHeader + Sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CoursesManagement />} />
          <Route path="courses/new" element={<CoursesForm />} />
          <Route path="growth" element={<GrowthManagement />} />
          <Route path="contact" element={<ContactManagement />} />
          <Route path="help" element={<HelpManagement />} />
        </Route>

        {/* === מסכי משתמש (User) === */}
        {/* כל מה שפה יקבל רק UserHeader (בלי Sidebar) */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="courses" element={<CoursesManagement />} /> {/* דוגמה לשימוש חוזר */}
          <Route path="contact" element={<ContactManagement />} /> {/* דוגמה */}
          <Route path="help" element={<HelpUser />} />  {/* דוגמה */}
          
        </Route>

        {/* ברירת מחדל */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;