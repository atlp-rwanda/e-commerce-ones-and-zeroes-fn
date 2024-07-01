import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchAvailableProducts } from '../../redux/slices/availableProductSlice';
import Product from '../AvailableProduct/product';
import Pagination from '../AvailableProduct/pagination';

const ProductsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error, totalPages, currentPage: reduxCurrentPage } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState(reduxCurrentPage); 
  const productsPerPage = 10;
 

  useEffect(() => {
    dispatch(fetchAvailableProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-page">
      <h1 className="title">Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <Product 
            key={product.id} 
            name={product.name} 
            bonus={product.bonus}
            price={product.price} 
            images={product.images} 
            discount={product.discount} 
          />
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={totalPages * productsPerPage} 
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsPage;
