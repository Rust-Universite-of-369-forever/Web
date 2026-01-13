import { useEffect, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [card, setCard] = useState([]);

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
      <Header cartCount={card.length} totalPrice={totalPrice} />
      
      <main style={{ padding: '0 40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Наши товары</h1>
        
        {isLoading && <p style={{ textAlign: 'center' }}>⏳ Загружаем товары...</p>}

        {error && (
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
            ⚠️ {error}
          </div>
        )}

        {!isLoading && !error &&(
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)}/>
          ))}
        </div>
        )}
      </main>
    </div>
  );
}
export default App;