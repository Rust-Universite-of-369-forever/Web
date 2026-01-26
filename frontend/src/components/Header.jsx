function Header({ cartCount, wishlistCount, totalPrice, onOpenWishList, onOpenShop, onOpenOrders, ordersCount, onOpenCard}) {
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
      
       <div onClick={onOpenOrders} style={{ cursor: 'pointer' }}>
          📦 Мои заказы <strong>{ordersCount}</strong>
        </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div onClick={onOpenWishList} style={{ cursor: 'pointer' }}>
          ❤️ Избранное: <strong>{wishlistCount}</strong>
        </div>

        <div onClick={onOpenCard} style={{cursor: 'pointer'}}>
            🛒 Корзина: <strong>{cartCount}</strong> ({totalPrice} руб.)
        </div>
      </div>
    </header>
  );
}
export default Header;