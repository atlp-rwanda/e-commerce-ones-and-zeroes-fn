import React, { useState, useEffect } from 'react';
import './productManagement.scss';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState, AppDispatch } from '../../redux/store';
import { getproductsAction, updateProductAction, getProductByIdAction } from '../../redux/slices/productDahSlice';
import { deleteProductAction } from '../../redux/slices/deleteSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Toast from '../../components/Toast/Toast';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/Pagination/Pagination';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar'; // Single import statement
import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { RiDashboardHorizontalFill } from 'react-icons/ri';

interface Product {
  images: string[];
  productId: number;
  name: string;
  price: string;
  discount?: number;
  category: string;
  quantity: number;
  image: string;
}

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const products: Product[] = useSelector((state: RootState) => state.product.products);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);

  const showModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  const fetchProducts = () => {
    setLoading(true);
    dispatch(getproductsAction(userId!)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, userId]);

  const handleUpdate = (product: Product, field: string, value: string) => {
    const updatedProduct = { ...product, [field]: value };

    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('price', updatedProduct.price);
    formData.append('category', updatedProduct.category);
    formData.append('discount', (updatedProduct.discount ?? 0).toString());
    formData.append('quantity', updatedProduct.quantity.toString());
    if (updatedProduct.images && updatedProduct.images.length > 0) {
      updatedProduct.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    showModal("Are you sure you want to update this product?", () => {
      setLoading(true);
      dispatch(updateProductAction({ id: product.productId.toString(), data: formData }))
        .then(() => {
          fetchProducts();
          setToastMessage('Product updated successfully');
          setToastType('success');
        })
        .catch((err) => {
          console.log(err);
          setToastMessage('Failed to update product');
          setToastType('error');
        })
        .finally(() => setLoading(false));
    });
  };

  const handleDelete = (id: number) => {
    console.log("Attempting to delete product with ID:", id);
    showModal("Are you sure you want to delete this product?", () => {
      setLoading(true);
      dispatch(deleteProductAction(id))
        .then(() => {
          fetchProducts();
          setToastMessage('Product deleted successfully');
          setToastType('success');
        })
        .catch((err) => {
          console.log(err);
          setToastMessage('Failed to delete product');
          setToastType('error');
        })
        .finally(() => setLoading(false));
    });
  };

  const handleEdit = (id: any) => {
    setLoading(true);
    dispatch(getProductByIdAction(id))
      .then(() => {
        navigate(`/singleproduct/${id}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
        setToastType(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const paginatedProducts = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const [sideBarActive, setSideBarActive] = useState<boolean>(false);

  return (
    <div className="product-management-container">
      <Navbar
        sideBarActive={sideBarActive}
        updateSideBarActive={(state: boolean) => setSideBarActive(state)}
      />
      <Sidebar className={sideBarActive ? 'menuSideBar' : ''}>
        <li>
          <Link to={`/adminDash/${userId}`}>
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <RiDashboardHorizontalFill />
            </IconContext.Provider>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to={`/adminDash/${userId}/users`}>
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <FaUser />
            </IconContext.Provider>
            <span>Users</span>
          </Link>
        </li>
      </Sidebar>
      <h2>Manage products</h2>
      {loading && <Spinner />}
      {toastMessage && <Toast messageType={toastType} message={toastMessage} />}
      <div className="product-management-header">
        <h3>Products in shop</h3>
        <input type="text" placeholder="Search..." className="search" />
        <button className="create-button">+ create</button>
      </div>
      {products.length === 0 ? (
        <p className='no-products'>There are no products found in the collection.</p>
      ) : (
        <div className="products-grid">
          {paginatedProducts.map((product: Product) => (
            <div key={product.productId} className="product-item">
              <img src={product.images[0]} alt={product.name} className="product-image" />
              <div className="product-details">
                <TextField
                  label="Name"
                  defaultValue={product.name}
                  onBlur={(e) => handleUpdate(product, 'name', e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  defaultValue={product.price}
                  onBlur={(e) => handleUpdate(product, 'price', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="product-actions">
                <IconButton onClick={() => handleEdit(product.productId)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.productId)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        pageCount={Math.ceil(products.length / rowsPerPage)}
        updatePage={(page: number) => setCurrentPage(page + 1)}
      />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>{modalMessage}</p>
          <button onClick={() => { setIsModalOpen(false); modalAction?.(); }}>
            Confirm
          </button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
