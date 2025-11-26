const Header = () => {
  return (
    <header>
      <h1>שם האתר שלי</h1>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <a href="/">דף הבית</a>
        <a href="/about">אודות</a>
      </nav>
    </header>
  );
};

export default Header;