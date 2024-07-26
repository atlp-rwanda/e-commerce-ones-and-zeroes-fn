import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.scss';
import { Order } from '../../constants/types';
import { BACKEND_URL } from '../../constants/api';
import Pagination from '../Pagination/Pagination';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';
import { DecodedToken } from '../../Pages/Login/Login';
import { decodeToken } from 'react-jwt';
import { IconContext } from 'react-icons';
import { BsCart2 } from 'react-icons/bs';
import { FaUser, FaShoppingBag } from 'react-icons/fa';
import { IoIosHome } from 'react-icons/io';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // State for page size
  const [pageSizeInput, setPageSizeInput] = useState<string>('10'); // Input value for page size
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [sideBarActive, setSideBarActive] = useState<boolean>(false)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      const userInfo: DecodedToken | null = decodeToken(token)

      if (!userInfo) {
        return
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/users/${userInfo.userId}/orders`, {
          params: {
            page: currentPage,
            pageSize: pageSize // Include pageSize in request
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.orders);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, pageSize]); // Include pageSize in dependency array

  const viewDetails = (orderId: string) => {
    const selected = orders.find(order => order.orderId === orderId);
    if (selected) {
      setSelectedOrder(selected);
      setModalOpen(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSizeInput(event.target.value);
  };

  const applyPageSize = () => {
    const parsedPageSize = parseInt(pageSizeInput, 10);
    if (parsedPageSize > 0) {
      setPageSize(parsedPageSize);
      setCurrentPage(1); // Reset to the first page when page size changes
    }
  };

  const onClose = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orderPageContainer">
      <Navbar
        sideBarActive={sideBarActive}
        updateSideBarActive={(state: boolean) => setSideBarActive(state)}
      ></Navbar>
      <div className="orderContainer">
        <SideBar className={sideBarActive ? 'menuSideBar' : ''}>
          <li>
            <Link to={"/order"} className='active'>
              <IconContext.Provider value={{ className: "side-bar-icons" }}>
                <IoIosHome />
              </IconContext.Provider>
              <span>Orders</span>
            </Link>
          </li>
          <li>
            {" "}
            <Link to={"/"}>
              <IconContext.Provider value={{ className: "side-bar-icons" }}>
                <BsCart2 />
              </IconContext.Provider>
              <span>Collection</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <IconContext.Provider value={{ className: "side-bar-icons" }}>
                <FaShoppingBag />
              </IconContext.Provider>
              <span>Products</span>
            </Link>
          </li>
        </SideBar>
        <div className="orders-page">
          <h1>Orders</h1>
          <div className="page-size-input">
            <label htmlFor="pageSize">Orders Per Page:</label>
            <input
              type="number"
              id="pageSize"
              value={pageSizeInput}
              onChange={handlePageSizeChange}
              min="1"
              step="1"
            />
            <button onClick={applyPageSize} className="page-size-btn">Apply</button>
          </div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td data-label="Order ID">{index + ((currentPage - 1) * pageSize) + 1}</td>
                      <td data-label="Status">{order.status}</td>
                      <td data-label="Payment Status">{order.paid ? 'Paid' : 'Unpaid'}</td>
                      <td data-label="Created At">{new Date(order.createdAt).toLocaleString()}</td>
                      <td data-label="Updated At">{new Date(order.updatedAt).toLocaleString()}</td>
                      <td data-label="Actions">
                        <button className='btn'>View Details</button>
                      </td>
                      <td data-label="Actions">
                        <button className='btn'>Cancel Order</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination pageCount={totalPages} updatePage={handlePageChange} />
            </div>
          )}
        </div>

        {modalOpen && selectedOrder && (
          <div className='popup-modal'>
            <div className='popup-content--modal'>
              <h3>Order Details</h3>

              <p><strong>Order ID:</strong> {selectedOrder.orderId.slice(-12)}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <h3>Order Products</h3>

              {selectedOrder.Products.map((product) => (
                <div key={product.productId} className="product">
                  <p>{product.name}</p>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Quantity:</strong> {product.OrderProduct.quantity}</p>
                </div>
              ))}
              <button onClick={onClose} className='close-btn'>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
