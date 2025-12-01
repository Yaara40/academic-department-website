import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeBox from './components/WelcomeBox';
import CourseList from './courses/components/CourseList';

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <main style={{ flex: 1, padding: '20px' }}>
        <WelcomeBox />
        <CourseList />
      </main>
      <Footer />
    </div>
  );
};

export default App;