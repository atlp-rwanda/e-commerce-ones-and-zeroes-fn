import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUser, updateUser } from "../../redux/slices/userSlices";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal/modal";
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
  use2FA: boolean;
  passwordLastChanged: string;
}
interface UpdateProfileProps {
  closeModal: () => void;
}

const UpdatePerson: React.FC<UpdateProfileProps> = ({ closeModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = useParams<{ id?: string }>();

  const refetch = () => {
    if (id) {
      dispatch(fetchUser(id));
      
    }
  };
  // Initialize state with empty strings
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [preferredLanguage, setLanguage] = useState("");
  const [preferredCurrency, setCurrency] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGender(user.gender);
      setBirthDate(user.birthdate);
      setLanguage(user.preferredLanguage);
      setCurrency(user.preferredCurrency);
      setBillingAddress(user.billingAddress);
    }
  }, [user]);

  const UpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const { email, ...userWithoutEmail } = user;
      try {
        const updatedUser = await dispatch(
          updateUser({
            id: user.userId,
            user: {
              ...userWithoutEmail,
              firstName,
              lastName,
              gender,
              birthdate,
              preferredLanguage,
              preferredCurrency,
              billingAddress,
              email: "",
            },
          })
        ).unwrap();
        refetch();
      } catch (updateError) {
        console.error(`Failed to update user: ${updateError}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
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
              <label htmlFor="fname">First Name:</label>
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
              <label htmlFor="lname">Last Name:</label>
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
              <label htmlFor="gender">Sex:</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="names-div">
              <label htmlFor="birthdate">BirthDate:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={birthdate}
                onChange={handleDateChange} // Use handleDateChange function
              />
            </div>
          </div>
          <label htmlFor="language">Preferred Language:</label>
          <select
            id="language"
            name="language"
            value={preferredLanguage}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="French">French</option>
          </select>
          <label htmlFor="currency">Preferred Currency:</label>
          <select
            id="currency"
            name="currency"
            value={preferredCurrency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="usd">usd</option>
            <option value="Rwf">Rwf</option>
          </select>

          <label htmlFor="address">Current Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />

          <button className="edit-button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePerson;
function closeModal(): any {
  throw new Error("Function not implemented.");
}
