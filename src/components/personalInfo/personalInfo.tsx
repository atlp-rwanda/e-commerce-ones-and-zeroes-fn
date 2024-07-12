import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/slices/userSlices";
import "./personalInfoStyles.scss";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Modal from "../modal/modal";
import bgPhoto from "../../assets/images/bg.png";
import nodata from "../../assets/images/nodata.png"
import { Link } from "react-router-dom";
import UpdateProfile from "../../views/updateprofile";

const PersonalInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, isSuccess } = useSelector(
    (state: RootState) => state.user
  );
  const { id } = useParams<{ id?: string }>();

  const [firstName, setFirstName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const bgPhotoSrc = bgPhoto.toString();

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
    if (id) {
      dispatch(fetchUser(id));
    }
  };
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }

  },[isSuccess]);

  return (
    <div className="user-profile">
      <div className="bg-img">
        <img src={bgPhotoSrc} alt="" />
      </div>
      <div className="personal-info">
        <div className="personal-info-header">
          <h3>1.Personal Information</h3>
          <span
            onClick={openModal}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Edit
          </span>

          {isModalVisible && (
            <Modal onClose={closeModal}>
              <UpdateProfile />
            </Modal>
          )}
        </div>
        <div className="personal-info-deatails">
          <div className="details-part1">
            <table>
              <tbody>
                <tr>
                  <th>
                    <div>Names:</div>
                  </th>
                  <td>
                    <span className="namespan">
                      <div>{user ? user.firstName? user.firstName
                          : (<div>---</div>) : "....No Data....."} </div>
                      <div>{user ? user.lastName? user.lastName
                          : (<div>---</div>) : "....No Data....."}</div>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Email:</div>
                  </th>
                  <td>
                    <div id="email">
                      {user ? user.email? user.email
                          : (<div>---</div>)  : "....No Data....."}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Gender:</div>
                  </th>
                  <td>
                    <div id="gender">
                      {user ? user.gender? user.gender
                          : (<div>---</div>)  : "....No Data....."}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>BirthDate:</div>
                  </th>
                  <td>
                    <div id="birthdate">
                      {user
                        ? user.birthdate
                          ? formatDate(user.birthdate)
                          : (<div>---</div>)
                        : "....No Data....."}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Preferred Language:</div>
                  </th>
                  <td>
                    <div id="language">
                      {" "}
                      {user ? user.preferredLanguage? user.preferredLanguage
                          : (<div>---</div>)  : "....No Data......"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Preferred Currency:</div>
                  </th>
                  <td>
                    <div id="currency">
                      {user ? user.preferredCurrency? user.preferredCurrency
                          : (<div>---</div>)  : "....No Data......"}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className="details-part2">
            <table>
              <tbody>
                <tr>
                  <th>
                    <div>Current Address:</div>
                  </th>
                  <td>
                    <div id="address">
                      {user ? user.billingAddress? user.billingAddress
                          : (<div>---</div>)  : "....No Data......"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>Joined In:</div>
                  </th>
                  <td>
                    <div id="joinedAt">
                      {user
                        ? user.createdAt
                          ? formatDate(user.createdAt)
                          : ""
                        : "....No Data......"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>role:</div>
                  </th>
                  <td>
                    <div id="currency">
                      {user ? user.role : "....No Data......"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>password:</div>
                  </th>
                  <td>
                    <div id="birthdate">
                      <span>**********</span>
                      <span className="update-password">
                        <Link to="">
                          <img
                            width="15"
                            height="15"
                            src="https://img.icons8.com/pastel-glyph/64/40C057/loop.png"
                            alt="loop"
                          />
                          update
                        </Link>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>password Last Changed:</div>
                  </th>
                  <td>
                    <div id="language">
                      {" "}
                      {user
                        ? user.passwordLastChanged
                          ? formatDate(user.passwordLastChanged)
                          : ""
                        : "....No Data......"}
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>
                    <div>profile Last Updated:</div>
                  </th>
                  <td>
                    <div id="address">
                      {user
                        ? user.updatedAt
                          ? formatDate(user.updatedAt)
                          : ""
                        : "....No Data....."}
                    </div>
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

export default PersonalInfo;
