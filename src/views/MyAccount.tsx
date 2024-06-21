import React from "react";

import Header from "../components/userDashHeader/UserHeader";
import PersonalInfo from "../components/personalInfo/personalInfo";
import BillingAddress from "../components/billingAddress/billingaddress";

const MyAccount: React.FC = () => (
  <div className="myaccount">
    <Header />
    <PersonalInfo />
    <BillingAddress />
  </div>
);

export default MyAccount;
