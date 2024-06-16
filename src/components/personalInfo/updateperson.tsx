import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { updateUser } from "../../redux/slices/userSlices";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./personalInfoStyles.scss";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  billingAddress: string;
  createdAt: string;
  gender: string | null;
  preferredCurrency: string;
  preferredLanguage: string;
  role: string;
  updatedAt: string;
  isActive: boolean;
  isGoogle: boolean;
  isVerified: boolean;
  password: string;
  passwordLastChanged: string;
}

const UpdatePerson: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  // Initialize state with empty strings
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [preferredLanguage, setLanguage] = useState("");
  const [preferredCurrency, setCurrency] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  // Handle loading state
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Clear loading state after 5 seconds (example)
    const timeoutId = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
  }, []);

  useEffect(() => {
    // Update local state when user data changes
    if (user) {
      setFirstName(user.firstName); // Ensure it's not undefined
      setLastName(user.lastName);
      setGender(user.gender);
      setBirthDate(user.birthdate);
      setLanguage(user.preferredLanguage);
      setCurrency(user.preferredCurrency);
      setBillingAddress(user.billingAddress);
    }
  }, [user]);

  const UpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const { email, ...userWithoutEmail } = user;
      dispatch(
        updateUser({
          id: user.userId,
          user: {
            ...userWithoutEmail, // Use userWithoutEmail to exclude email
            firstName,
            lastName,
            gender,
            birthdate,
            preferredLanguage,
            preferredCurrency,
            billingAddress,
            email: ""
          },
        })
      );

      // Show success toast if loading
      if (loading) {
        toast.success("User is being updated!");
      }

      // Show modal and success toast after successful update
      if (!loading && !error) {
        toast.success("User updated successfully!");
        // Example: setIsModalVisible(true);
      }

      // Handle error toast
      if (error) {
        toast.error(`Failed to update user. ${error}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd"); // Customize the format as needed
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = formatDate(e.target.value);
    setBirthDate(formattedDate);
  };

  return (
    <div className="edit-page" data-testid="UpdatePerson">
      <div className="right-side-edit">
        <form onSubmit={UpdateUser}>
          <h2>Update Personal Information</h2>
          <hr />
          <div className="names-input">
            <div className="names-div">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="names fname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="names-div">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                className="names lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="names-input">
            <div className="names-div">
              <label htmlFor="gender">Sex</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="names-div">
              <label htmlFor="birthdate">BirthDate(mm-dd-yy)</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={birthdate}
                onChange={handleDateChange} // Use handleDateChange function
              />
            </div>
          </div>

          <label htmlFor="language">Preferred Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={preferredLanguage}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <label htmlFor="currency">Preferred Currency</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={preferredCurrency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <label htmlFor="address">Current Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />

          <button type="submit">UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePerson;
