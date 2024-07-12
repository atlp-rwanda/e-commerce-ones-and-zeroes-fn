import React from "react";
import UpdateBillingAddress from "../components/billingAddress/updatebillingaddress";

const UpdateBilling: React.FC = () => {
  return (
    <div>
      <UpdateBillingAddress onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};
export default UpdateBilling;
