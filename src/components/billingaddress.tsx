import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUser } from '../redux/slices/userSlices';
import Modal from "./modal";

import { format } from 'date-fns';
import { Link } from "react-router-dom";

const BillingAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState)=> state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {
    // dispatch(fetchUser(''));
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy'); // Customize the format as needed
  };

  if (loading) {
    return <div hidden>Loading...</div>; // Placeholder for loading indicator
  }

  if (error) {
    return <div hidden>Error:Failed to fetch user data</div>; // Display error message
  }
  const openModal = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default link behavior
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // if (id) { 
    //   dispatch(fetchUser(id));
    // }
  };
  return (
    <div className="billing">
      <div className="billing-address">
        <div className="billing-address-header">
          <h3>2. Billing Address</h3>
          <span onClick={openModal} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
        <img
          width="15"
          height="15"
          src="https://img.icons8.com/pastel-glyph/64/40C057/edit--v1.png"
          alt="edit--v1"
        />
        Edit
      </span>
      {isModalVisible && (
        <Modal onClose={closeModal} children={undefined} >
          {/* <UpdateProfile /> */}
        </Modal>
      )}
        </div>
        <div className="billing-details">
          <div className="billing-details-part1">
            <div className="billing-data">
              <div>Country:</div>
              <div>Province:</div>
              <div>District:</div>
              <div>Sector:</div>
            </div>
            <div className="billing-retrieved-data">
            <div>Country:</div>
              <div>Province:</div>
              <div>District:</div>
              <div>Sector:</div>
            </div>
          </div>
          <div className="billing-details-part2">
            <div className="billing-data">
              <div>Street:</div>
            </div>
            <div className="billing-retrieved-data">
            <div>Street:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
