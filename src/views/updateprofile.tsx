import React from "react";
import UpdatePerson from "../components/personalInfo/updateperson";

const UpdateProfile: React.FC = () => {
  return (
    <div>
      <UpdatePerson closeModal={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    </div>
  );
};
export default UpdateProfile;
