import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:2000";

interface Cart {
  productId: string;
  quantity: number;
}
interface Product {
  [x: string]: any;
  image: string;
  description: string;
  productId: string;
  name: string;
  price: string;
  category: string;
  quantity: number;
  images: string[];
}
interface CartState {
  cart: Cart[]; // Changed to array to handle multiple products
  loading: boolean;
  error: string | null;
  cartId: string;
  products: Product[];
  total: number;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
  cartId: "",
  products: [],
  total: 0,
};

export const addProductInCart = createAsyncThunk(
  "cart/addProduct",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const token = localStorage.getItem('token')
     

    if (!token) {
      toast.error("login First");
      throw new Error("Bearer token is not available");
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/carts`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added in cart successfully");
      return response.data;
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || "Failed to add product in the cart";
      console.error("Failed to add product in the cart:", errorMessage);
      toast.error(`${errorMessage}`);
      throw error;
    }
  }
);
export const fetchProductsInCart = createAsyncThunk('cart/fetchProductsInCart', async ()=>{
   // Retrieve the token from local storage
   const token = localStorage.getItem('token');

   if (!token) {
    //  throw new Error('Bearer token is not available');
     toast(`session expired`);
     
   }
 try {
  const response = await axios.get(`${BACKEND_URL}/api/carts`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log(response.data);
  // console.log('total in cart', response.data.total);
  const total = response.data.total
  

  return (response.data.data)
 } catch(error:any) {
  const errorMessage = error.response?.data?.message || "Failed to fetch products in the cart";
  console.error("Failed to fetch products in the cart:", errorMessage);
  toast.error(`Failed to fetch products in the cart: ${errorMessage}`);
  throw error;
}
});
export const fetchTotalInCart = createAsyncThunk('cart/fetchtotalInCart', async ()=>{
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  if (!token) {
   //  throw new Error('Bearer token is not available');
    toast(`session expired`);
    
  }
try {
 const response = await axios.get(`${BACKEND_URL}/api/carts`,{
   headers:{
     Authorization:`Bearer ${token}`
   }
 });
 console.log(response.data);
//  console.log('total in cart', response.data.total);
 const total = response.data.total
 

 return (response.data)
} catch(error:any) {
 const errorMessage = error.response?.data?.message || "Failed to fetch Total in the cart";
 console.error("Failed to fetch Total in the cart:", errorMessage);
 toast.error(`Failed to fetch Total in the cart: ${errorMessage}`);
 throw error;
}
});
export const updateProductQuantitylInCart = createAsyncThunk('cart/fetchtotalInCart', async ()=>{
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');

  if (!token) {
   //  throw new Error('Bearer token is not available');
    toast(`session expired`);
    
  }
try {
 const response = await axios.get(`${BACKEND_URL}/api/carts`,{
   headers:{
     Authorization:`Bearer ${token}`
   }
 });
 console.log(response.data);
//  console.log('total in cart', response.data.total);
 const total = response.data.total
 

 return (response.data)
} catch(error:any) {
 const errorMessage = error.response?.data?.message || "Failed to fetch Total in the cart";
 console.error("Failed to fetch Total in the cart:", errorMessage);
 toast.error(`Failed to fetch Total in the cart: ${errorMessage}`);
 throw error;
}
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProductInCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addProductInCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to add product in the cart";
      })
      .addCase(fetchProductsInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsInCart.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.products = action.payload.Products; // Assuming structure of action.payload
       
          state.loading = false;
        }
      )
      .addCase(fetchProductsInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products in cart";
      })
      .addCase(fetchTotalInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTotalInCart.fulfilled,
        (state, action: PayloadAction<any>) => {
          
          state.total = action.payload.total;
          state.loading = false;
        }
      )
      .addCase(fetchTotalInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch total in cart";
      });
  },
});

export default cartSlice.reducer;
