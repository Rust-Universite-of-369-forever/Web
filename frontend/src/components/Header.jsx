function Header({ cartCount, wishlistCount, totalPrice, onOpenWishlist, onOpenShop}) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      backgroundColor: '#2c3e50',
      color: 'white'
    }}>
      <div onClick={onOpenShop} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Онлайн магазин</div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Кнопка вишлиста со счетчиком */}
        <div onClick={onOpenWishlist} style={{ cursor: 'pointer' }}>
          ❤️ Избранное: <strong>{wishlistCount}</strong>
        </div>

        <div>
          🛒 Корзина: <strong>{cartCount}</strong> ({totalPrice} руб.)
        </div>
      </div>
    </header>
  );
}
export default Header;