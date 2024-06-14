import React from "react";

import Header from "../components/UserHeader";
import PersonalInfo from "../components/personalInfo";
import BillingAddress from "../components/billingaddress";

const MyAccount: React.FC = () => (
  <div className="myaccount">
    <Header />
    <PersonalInfo />
    <BillingAddress />
  </div>
);

export default MyAccount;
