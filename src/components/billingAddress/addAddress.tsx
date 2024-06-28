import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { addAddress } from "../../redux/slices/addressSlice";

const AddBillingAddress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.address);

  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [street, setStreet] = useState("");

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      country,
      province,
      district,
      sector,
      street,
    };

    try {
      await dispatch(addAddress(newAddress)).unwrap();
      toast.success("Address added successfully!");
      setCountry("");
      setProvince("");
      setDistrict("");
      setSector("");
      setStreet("");
    } catch (addError) {
    console.error(`Failed to add address: ${addError}`);
    }
  };

  return (
    <div className="edit-page">
    <div className="back"></div>
    <div className="left-side-edit">
      <h2>Welcome to OnesAndZeroes</h2>
      {/* <img src={updateaddressimg} alt="" /> */}
      <h2>We Deliver Anywhere in the World</h2>
    </div>
    <div className="right-side-edit">
      <form onSubmit={handleAddAddress}>
        <h2>Add Billing Address</h2>
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

        <button type="submit">ADD</button>
      </form>
    </div>
  </div>
);
};

export default AddBillingAddress;
