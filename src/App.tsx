import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <main style={{ flex: 1, padding: '20px' }}>
        <h2>ברוכים הבאים לאתר</h2>
        <p>כאן יבוא התוכן המרכזי של העמוד</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;