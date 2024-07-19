// types.ts
export interface Product {
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
    OrderProduct: {
      quantity: number;
    };
  }
  
  export interface Order {
    orderId: string;
    userId: string;
    cartId: string;
    addressId: string;
    paid: boolean;
    paymentIntentId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    Products: Product[];
  }
  