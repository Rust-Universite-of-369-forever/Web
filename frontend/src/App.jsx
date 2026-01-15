import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import { stringify } from 'postcss';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [card, setCard] = useState([]);
  const [view, setView] = useState('shop');
  const [orders, setOrders] = useState([]);

  const palaceOrder = (product) => {
    const neOrder = {...product, orderId: Date.now()};
    setOrders(...orders, neOrder)
  }

  const cancelOrder = (orderId) => {
    if(window.confirm("Вы действительно хотите удалить заказ?"))
    {
      setOrders(orders.filter(item => item.orderId !== orderId))
    }
  }

  const handleCheckout = () => {
    const newOrders = card.map(item => ({
      ...item,
      orderId: Date.now() + Math.random()
    }));

    setOrders([...orders, ...newOrders]); // Теперь она должна их видеть
    setCard([]); 
    setView('orders');
    alert("Заказ оформлен!");
  };

  const [wishlist, setwishlist] = useState(() => {
    const saved = localStorage.getItem('my_wishlist')
    return saved ? JSON.parse(saved) : []
  });

  useEffect(() => {
    localStorage.setItem('my_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (product) => {
    setwishlist((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

   const updateProductQuantity = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const addToCart = (productToAdd) => {
    if (productToAdd.quantity > 0) { 
      setCard(prevCart => [...prevCart, productToAdd]);
      updateProductQuantity(productToAdd.id); 
    } else {
      alert(`Извините, товара "${productToAdd.name}" больше нет в наличии.`);
    }
    alert(`Поздравлям! Вы заказали товар "${productToAdd.name}!"`)
  };

  useEffect(() => {
    const controller = new AbortController(); 
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    setIsLoading(true);

    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
        clearTimeout(timeoutId);
      })
      .catch(err => {
      if (err.name === 'AbortError') {
        setError("Время ожидания истекло. Сервер не ответил за 5 секунд.");
      } else {
        setError("Ошибка соединения с сервером.");
      }
      setIsLoading(false);
    });

  return () => clearTimeout(timeoutId); 
  }, []);

  const totalPrice = card.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Header cartCount={card.length} totalPrice={totalPrice} 
      onOpenWishList={() => setView('wishlist')} onOpenShop={() => setView('shop')} wishlistCount={wishlist.length}
      onOpenOrders={() => setView('orders')} ordersCount={orders.length} onOpenCard={() => setView('card')}/>
      
      <main style={{ padding: '0 40px' }}>
        {view === 'shop' ? (
          <>
            <h1 style={{ textAlign: 'center', marginBottom: '30px'}}>Наши товары</h1>
            {isLoading && <p>Загрузка...</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={() => addToCart(product)}
                  onWishlist={() => toggleWishlist(product)}
                  isFavorite={wishlist.some(item => item.id === product.id)}
                  onOrder={() => palaceOrder(product)}
                  onCancel={() => cancelOrder(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setView('shop')} style={{ marginBottom: '20px' }}>← Вернуться в магазин</button>
            <h1 style={{ textAlign: 'center' }}>Мой список желаний ({wishlist.length})</h1>
            
            {wishlist.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Тут пока ничего нет...</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {wishlist.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={() => addToCart(product)}
                    onWishlist={() => toggleWishlist(product)}
                    isFavorite={true}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {view === 'card' && (
          <>
            <button onClick={() => setView('shop')}>← Вернуться в магазин</button>
      <h1 style={{ textAlign: 'center' }}>Моя корзина ({card.length})</h1>
      {card.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Корзина пуста</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {card.map((product, index) => (
            <div key={index} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '10px' }}>
              <h3>{product.name}</h3>
              <p>{product.price} руб.</p>
              {/* Тут можно добавить кнопку "Удалить из корзины" */}
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', textAlign: 'right', padding: '20px' }}>
            <h2>Итого: {totalPrice} руб.</h2>
            <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', position: 'relative', 
            zIndex: 999  }}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
          </>
        )}
        {view === 'orders' && (
    <>
      <button onClick={() => setView('shop')} style={{ marginBottom: '20px' }}>← В магазин</button>
      <h1 style={{ textAlign: 'center' }}>Мои заказы ({orders.length})</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {orders.map(order => (
          <div key={order.orderId} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '12px', position: 'relative', backgroundColor: 'white' }}>
            <h3>{order.name}</h3>
            <p>Цена: <strong>{order.price} руб.</strong></p>
            <p style={{ color: '#27ae60', fontSize: '14px' }}>● Оформлено (Ожидает получения)</p>
            <button 
              onClick={() => cancelOrder(order.orderId)}
              style={{
                marginTop: '10px',
                width: '100%',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '8px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Отменить заказ
            </button>
          </div>
        ))}
      </div>
    </>
  )}       
      </main>
    </div>
  );
}
export default App;