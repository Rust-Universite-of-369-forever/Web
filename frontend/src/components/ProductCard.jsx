function ProductCard({ product, onAdd, onWishlist, isFavorite }) {
  const isOutOfStock = product.quantity <= 0;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '15px',
      textAlign: 'center',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {}
      <div style={{ height: '180px', marginBottom: '10px', overflow: 'hidden', borderRadius: '8px' }}>
        <img 
          src={product.image || 'via.placeholder.com'} 
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain' 
          }}
        />
      </div>

      <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
      
      <p style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '1.2rem' }}>
        {product.price} ₽
      </p>
      
      <p style={{ fontSize: '0.8rem', color: isOutOfStock ? 'red' : '#666' }}>
        {isOutOfStock ? 'Нет в наличии' : `В наличии: ${product.quantity} шт.`}
      </p>
      
      <button 
        onClick={onAdd} 
        disabled={isOutOfStock}
        style={{
          backgroundColor: isOutOfStock ? '#ccc' : '#3498db',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '6px',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer',
          marginTop: '10px'
        }}
      >
        {isOutOfStock ? 'Закончился' : 'В корзину'}
      </button>

      <button 
        onClick={onWishlist} 
        style={{ color: isFavorite ? 'red' : 'gray', border: 'none', background: 'none', cursor: 'pointer' }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
export default ProductCard