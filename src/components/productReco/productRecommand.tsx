import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../AvailableProduct/product';
import { BACKEND_URL } from '../../constants/api';
import "./productRecommend.scss"
import Header from '../Header';
const RecommendProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {    
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/${productId}`);
        console.log(response)
        setProduct(response.data.data);
      } catch (err) {
        setError('Failed to fetch product');
      }
    };

    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/products/recommend`, {
            "productId": productId
        });
        setRecommendedProducts(response.data.products);
      } catch (err) {
        console.log(err)
        setError('Failed to fetch recommended products');
      }
    };

    fetchProduct();
    fetchRecommendedProducts();
    setLoading(false);

  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <Header/>
      {product ? (
  <div className="product-details">
    <h1>{product.name}</h1>
    <img src={product.images[0]} alt={product.name} />
    <p>Price: {product.price} $</p>
    <p>Category: {product.category}</p>
    <p>Discount: {product.discount}</p>
    <p>Description: {product.description}</p>
  </div>
) : (
  <div className="product-not-found">Product not found</div>
)}
<div className="product-container">
  <h3>You might also like this</h3>
  <div className="product-list">
    {recommendedProducts.map((recommendedProduct) => (
      <Product 
        key={recommendedProduct.productId} 
        productId={recommendedProduct.productId} 
        name={recommendedProduct.name} 
        category={recommendedProduct.category}
        price={recommendedProduct.price} 
        images={recommendedProduct.images} 
        discount={recommendedProduct.discount} 
      />
    ))}
  </div>
</div>


    </div>

  );
};

export default RecommendProduct;