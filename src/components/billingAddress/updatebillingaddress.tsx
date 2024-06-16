import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { fetchAddress, updateAddress } from "../../redux/slices/addressSlice";
import { closeModal, fetchUser } from "../../redux/slices/userSlices";
import { useParams } from "react-router";

interface UpdateBillingAddressProps {
  onClose: () => void;
}

const UpdateBillingAddress: React.FC<UpdateBillingAddressProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { address, loading, error } = useSelector((state: RootState) => state.address);
  
  const [country, setCountry] = useState(address?.country || "");
  const [province, setProvince] = useState(address?.province || "");
  const [district, setDistrict] = useState(address?.district || "");
  const [sector, setSector] = useState(address?.sector || "");
  const [street, setStreet] = useState(address?.street || "");

  useEffect(() => {
    if (address) {
      setCountry(address.country || ""); // Ensure it's not undefined
      setProvince(address.province || "");
      setDistrict(address.district || "");
      setSector(address.sector || "");
      setStreet(address.street || "");
    }
  }, [address]);

  const { id } = useParams<{ id?: string }>();

  const UpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      const updatedAddress = {
        ...address,
        country,
        province,
        district,
        sector,
        street,
      };

      try {
        await dispatch(updateAddress(updatedAddress)).unwrap();
        dispatch(fetchAddress());
        onClose(); // Close the modal after successful update
      } catch (updateError) {
        console.error(`Failed to update address: ${updateError}`);
      }
    }
  };

  return (
    <div className="edit-page">
      <div className="right-side-edit">
        <form onSubmit={UpdateAddress}>
          <h2>Update Billing Address</h2>
          <hr />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label htmlFor="province">Province</label>
          <input
            type="text"
            name="province"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
          <label htmlFor="district">District</label>
          <input
            type="text"
            name="district"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            name="sector"
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
          <label htmlFor="street">Street</label>
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <button type="submit">UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBillingAddress;
