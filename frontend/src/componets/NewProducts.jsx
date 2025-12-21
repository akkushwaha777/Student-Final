import { useState, useEffect } from 'react';
import API from './api';

const StarRating = ({ rating }) => {
  // Mock rating for now as backend doesn't store it yet
  const stars = [];
  const rate = Math.round(rating || 0);

  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rate ? 'star filled' : 'star'}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading products...</p>
    </div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Store Products</h1>
        <p className="products-subtitle">Browse our collection of {products.length} products</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card-wrapper">
            <div className="product-card">
              <div className="product-body">
                <span className="product-category">{product.category}</span>
                <h5 className="product-title">{product.name}</h5>
                <p className="product-description">{product.description}</p>
                {/* Rating is minimal/mocked for now */}
                <StarRating rating={4} />
                <div className="product-footer">
                  <span className="product-price">₹ {product.price ? product.price.toFixed(2) : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No products available.</p>}
      </div>
    </div>
  );
};

export default NewProducts;
