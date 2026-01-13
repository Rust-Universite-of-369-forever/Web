function Header({ cartCount, totalPrice }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      backgroundColor: '#2c3e50',
      color: 'white'
    }}>
      <h2>Онлайн магазин</h2>
      <div style={{ textAlign: 'left' }}>
        <div>🛒 Товаров: <strong>{cartCount}</strong></div>
        <div style={{ fontSize: '0.9rem', color: '#2ecc71' }}>
          Сумма: <strong>{totalPrice} ₽</strong>
        </div>
      </div>
    </header>
  );
}
export default Header;
