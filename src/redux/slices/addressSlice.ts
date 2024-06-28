import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
if (!BACKEND_URL) {
  console.error("Backend URL is not defined in environment variables");
}
// Define an interface for the address object
interface Address {

  country: string; // Country of the address
  province: string; // Province of the address
  district: string; // District of the address
  sector: string; // Sector of the address
  street: string; // Street of the address
  
}

interface AddressState {
  address: Address | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  address: null,
  loading: false,
  error: null,
};
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (address: Address) => {
    if (!BACKEND_URL) {
      throw new Error('Backend URL is not defined');
    }

    const token = localStorage.getItem('token');

    if (!token) {
      toast('Session expired');
      throw new Error('Bearer token is not available');
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/addresses`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Response from server:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Failed to add address:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        toast.error(`Failed to add address: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        console.error('Error request data:', error.request);
        toast.error('Failed to add address: No response from server');
      } else {
        toast.error(`Failed to add address: ${error.message}`);
      }
      throw error;
    }
  }
);
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async () => {
    if (!BACKEND_URL) {
      console.log("Backend URL is not defined");
      throw new Error("Backend URL is not defined");
    }
    console.log("backend url", BACKEND_URL);

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      toast(`Session expired`);
      throw new Error("Bearer token is not available");
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/addresses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (address: any) => {
    if (!BACKEND_URL) {
      throw new Error("Backend URL is not defined");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast("Session expired");
      throw new Error("Bearer token is not available");
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/addresses`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from server:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Failed to update address:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        toast(
          `Failed to update address: ${error.response.data.message || error.response.data}`
        );
      } else if (error.request) {
        console.error("Error request data:", error.request);
        toast("Failed to update address: No response from server");
      } else {
        toast(`Failed to update address: ${error.message}`);
      }
      throw error;
    }
  }
);
// Create address slice
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.address = action.payload;
          state.loading = false;
        }
      )
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create address";
      })
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.address = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch address";
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.address = action.payload;
          state.loading = false;
        }
      )
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch address";
      });
  },
});

export default addressSlice.reducer;
