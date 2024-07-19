import React, { useState, useEffect } from 'react';
import './sellerDashbord.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { getproductsAction, getcorectionaction, Correction } from '../../redux/slices/productDahSlice';
import { fetchAvailableProducts } from '../../redux/slices/availableProductSlice';
import { useParams } from 'react-router';
import Pagination from '../../components/Pagination/Pagination';

interface SellerDashboardProps {
  userId: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);
  const corrections: Correction[] = useSelector((state: RootState) => state.product.corrections);
  const availableProductsState = useSelector((state: RootState) => state.products);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const params: any = useParams();

 //how i put the  pagination usestate
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(3); 

  useEffect(() => {
    // Fetch total products
    dispatch(getproductsAction(params.userId))
      .then(() => {
        setTotalProducts(products.length);
      })
      .catch((err) => console.log(err));

    dispatch(fetchAvailableProducts(1)); 

    dispatch(getcorectionaction(userId))
      .catch((err) => console.log(err));
  }, [dispatch, userId, products.length]);

  const totalAvailableProducts = availableProductsState.products.length;

  //how to calculatr the  paginated corrections
  const paginatedCorrections = corrections.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(corrections.length / rowsPerPage);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Seller Dashboard</h1>
      <div className="dashboard__cards">
        <div className="card">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h2>Available Products</h2>
          <p>{totalAvailableProducts}</p>
        </div>
      </div>
      <div className="dashboard__orders">
        <h2>Collections</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Collection Number</th>
              <th>Collection Name</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCorrections.map((correction: Correction, index: number) => (
              <tr key={correction.id}>
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td>{correction.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageCount={totalPages}
          updatePage={(page: number) => setCurrentPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;



