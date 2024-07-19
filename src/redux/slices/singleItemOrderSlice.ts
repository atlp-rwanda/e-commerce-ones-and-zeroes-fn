import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/api';
interface CheckoutObjectInterface {
  message: string;
  cart: {
    cartId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    Products: {
      productId: string;
      name: string;
      price: string;
      category: string;
      quantity: number;
      expiryDate: string;
      description: string | null;
      bonus: string;
      discount: string | null;
      images: string[];
      isAvailable: boolean;
      createdAt: string;
      updatedAt: string;
      collectionId: string;
      CartProduct: {
        quantity: number;
      };
    }[];
  };
  order: {
    paid: boolean;
    status: string;
    orderId: string;
    userId: string;
    cartId: string;
    addressId: string;
    paymentIntentId: string;
    updatedAt: string;
    createdAt: string;
  };
  paymentIntent: {
    id: string;
    object: string;
    amount: number;
    amount_capturable: number;
    amount_details: {
      tip: {};
    };
    amount_received: number;
    application: null | string;
    application_fee_amount: null | number;
    automatic_payment_methods: {
      allow_redirects: string;
      enabled: boolean;
    };
    canceled_at: null | string;
    cancellation_reason: null | string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: null | string;
    description: null | string;
    invoice: null | string;
    last_payment_error: null | string;
    latest_charge: null | string;
    livemode: boolean;
    metadata: {};
    next_action: null | string;
    on_behalf_of: null | string;
    payment_method: null | string;
    payment_method_configuration_details: null | string;
    payment_method_options: {
      card: {
        installments: null | string;
        mandate_options: null | string;
        network: null | string;
        request_three_d_secure: string;
      };
    };
    payment_method_types: string[];
    processing: null | string;
    receipt_email: null | string;
    review: null | string;
    setup_future_usage: null | string;
    shipping: null | string;
    source: null | string;
    statement_descriptor: null | string;
    statement_descriptor_suffix: null | string;
    status: string;
    transfer_data: null | string;
    transfer_group: null | string;
  };
  orderProduct: {
    quantity: number
  }
}

const initialState = {
  isLoading: false,
  error: null as string | null,
  checkoutObject: null as CheckoutObjectInterface | null,
};

interface SingleItemOrderInterface {
  productId: string;
  quantity: number;
}

export const createSingleItemOrder = createAsyncThunk(
  'singleItemOrder/createSingleItemOrder',
  async ({ productId, quantity }: SingleItemOrderInterface, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
      const addressIdResponse = await axios.get(`${BACKEND_URL}/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const addressId = addressIdResponse.data.data.addressId;

      const orderCreationResponse = await axios.post(
        `${BACKEND_URL}/api/orders`,
        { productId, quantity, addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { response: orderCreationResponse.data };
    } catch (error) {
      console.error('Error during checkout:', error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

const singleItemOrderSlice = createSlice({
  name: 'singleItemOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSingleItemOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSingleItemOrder.fulfilled, (state, action: PayloadAction<{ response: CheckoutObjectInterface }>) => {
        state.isLoading = false;
        state.checkoutObject = action.payload.response;
      })
      .addCase(createSingleItemOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string ?? 'An error occurred';
      });
  },
});

export default singleItemOrderSlice.reducer;
