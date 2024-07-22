import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchAvailableProducts } from '../../redux/slices/availableProductSlice';
import Product from '../AvailableProduct/product';
import Pagination from '../AvailableProduct/pagination';
import { FaSlidersH } from 'react-icons/fa';

const ProductsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error, totalPages, currentPage: reduxCurrentPage } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState(reduxCurrentPage);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAvailableProducts({ page: currentPage, searchKeyword, minPrice, maxPrice }));
  }, [dispatch, currentPage, searchKeyword, minPrice, maxPrice]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(fetchAvailableProducts({ page: 1, searchKeyword, minPrice, maxPrice }));
  };

  const toggleSearchBar = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value === '' ? undefined : Number(value));
  };

  return (
    <div className="products-page">
      <h1 className="title">Products</h1>
      <div className="search-toggle">
        <pre>Filter your Results  </pre>
        <FaSlidersH onClick={toggleSearchBar} style={{ cursor: 'pointer' }} />
      </div>
      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search keyword (eg.: Name, Category ....)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice || ''}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice === undefined ? '' : maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      )}
      {loading ? (
        <div className="loading-message">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="noproduct-message">
          <div className="noproduct-card">
            <h3>No available products in our stock</h3>
          </div>
        </div>
      ) : (
        <>
          <div className="product-list">
            {products.map((product) => (
              <Product
                key={product.productId}
                productId={product.productId}
                name={product.name}
                category={product.category}
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
        </>
      )}
    </div>
  );
};

export default ProductsPage;
