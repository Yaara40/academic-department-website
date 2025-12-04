const Header = () => {
  return (
    <header style={{ 
      backgroundColor: '#4A90E2', 
      color: 'white', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>האתר של תמר ויערה</h1>
      <nav style={{ 
        display: 'flex', 
        gap: '20px',
        justifyContent: 'center',
        marginTop: '10px'
      }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>דף הבית</a>
        <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>אודות</a>
      </nav>
    </header>
  );
};

export default Header;