import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import MyAccount from "../src/views/MyAccount";
import Header from "../src/components/userDashHeader/UserHeader";
import PersonalInfo from "../src/components/personalInfo/personalInfo";
import BillingAddress from "../src/components/billingAddress/billingaddress";
import { Store, UnknownAction } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
// Mock the child components
jest.mock("../src/components/UserHeader", () => () => <div>Hello, John</div>);
jest.mock("../src/components/personalInfo", () => () => (
  <div>Personal Info</div>
));
jest.mock("../src/components/billingaddress", () => () => (
  <div>Billing Address</div>
));

// Create a mock store without middleware
const mockStore = configureStore([]);

describe("MyAccount component", () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: { firstName: "John" },
      },
    });
  });

  test("renders Header, PersonalInfo, and BillingAddress components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyAccount />
        </BrowserRouter>
      </Provider>
    );

    // Check if the Header component is rendered
    expect(screen.getByText("Hello, John")).toBeInTheDocument();

    // Check if the PersonalInfo component is rendered
    expect(screen.getByText("Personal Info")).toBeInTheDocument();

    // Check if the BillingAddress component is rendered
    expect(screen.getByText("Billing Address")).toBeInTheDocument();
  });
});
