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
 
  return (
    <div className="products-page">
      <h1 className="title">Products</h1>
      {loading ? (
        <div className="loading-message">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="noproduct-message">
          <div className='noproduct-card'>
            <h3>No available products in our stock</h3>
          </div>
        </div>
      ) : (
        <>
          <div className="product-list">
            {products.map((product) => (
              <Product 
                key={product.productId}
                name={product.name}
                category={product.category}
                price={product.price}
                images={product.images}
                discount={product.discount}
                 productId={product.productId}              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={totalPages * productsPerPage} 
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
