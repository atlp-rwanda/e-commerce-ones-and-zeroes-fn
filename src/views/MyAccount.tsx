import React from "react";

import Header from "../components/userDashHeader/UserHeader";
import PersonalInfo from "../components/personalInfo/personalInfo";
import BillingAddress from "../components/billingAddress/billingaddress";

const MyAccount: React.FC = () => (
  <div style={{
    backgroundColor:"#f5f5f5"
  }}>
    <Header />
    <PersonalInfo />
    <BillingAddress />
  </div>
);

export default MyAccount;
