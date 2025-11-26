import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeBox from './components/WelcomeBox';

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
      </main>
      <Footer />
    </div>
  );
};

export default App;