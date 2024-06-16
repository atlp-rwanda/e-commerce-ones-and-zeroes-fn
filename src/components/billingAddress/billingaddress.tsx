import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import Modal from "../modal/modal";
import { fetchAddress } from "../../redux/slices/addressSlice";
import "./billingStyles.scss";
import { format } from "date-fns";
import UpdateBillingAddress from "./updatebillingaddress";

const BillingAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address, loading, error } = useSelector(
    (state: RootState) => state.address
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy"); // Customize the format as needed
  };

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default link behavior
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);

    dispatch(fetchAddress());
  };
  return (
    <div className="billing">
      <div className="billing-address">
        <div className="billing-address-header">
          <h3>2. Billing Address</h3>
          <span
            onClick={openModal}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <img
              width="15"
              height="15"
              src="https://img.icons8.com/pastel-glyph/64/40C057/edit--v1.png"
              alt="edit--v1"
            />
            Edit
          </span>
          {isModalVisible && (
            <Modal
              onClose={closeModal}
              children={<UpdateBillingAddress />}
            ></Modal>
          )}
        </div>
        <div className="billing-details">
          <div className="billing-details-part1">
            <table>
              <tbody>
                <tr>
                  <th>
                    <div>Country:</div>
                  </th>
                  <td>
                    <div>{address ? address.country : "Loading..."}</div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Province:</div>
                  </th>
                  <td>
                    <div>{address ? address.province : "Loading..."}</div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>District:</div>
                  </th>
                  <td>
                    <div>{address ? address.district : "Loading..."}</div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Sector:</div>
                  </th>
                  <td>
                    <div>{address ? address.sector : "Loading..."}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="billing-details-part2">
            <table>
              <tbody>
                <tr>
                  <th>
                    <div>Street:</div>
                  </th>
                  <td>
                    <div>{address ? address.street : "Loading..."}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
