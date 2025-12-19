import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursesManagement from './pages/CoursesManagement';
import CoursesForm from './features/courses/components/CoursesForm';
import GrowthManagement from './pages/GrowthManagement';
import ContactManagement from './pages/ContactManagement';
import HelpManagement from './pages/HelpManagement';
import NavigationManagement from './pages/NavigationManagement';

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <main style={{ 
        flex: 1, 
        padding: '20px', 
        marginRight: '220px' // Account for 200px sidebar + 20px spacing
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesManagement />} />
          <Route path="/courses/new" element={<CoursesForm />} /> {/* ← הוספתי את זה! */}
          <Route path="/growth" element={<GrowthManagement />} />
          <Route path="/contact" element={<ContactManagement />} />
          <Route path="/help" element={<HelpManagement />} />
          <Route path="/navigation" element={<NavigationManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;