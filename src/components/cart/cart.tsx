import React, { useEffect, useState } from "react";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProductsInCart } from "../../redux/slices/cartSlice";
import { fetchTotalInCart } from "../../redux/slices/cartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products = [], loading } = useSelector(
    (state: RootState) => state.cart
  );
  const { total } = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState<number>(1);
// useEffect(() => {
//   if (products.length > 0) {
//     // Set initial quantity to the first product's quantity
//     setQuantity(products[0].CartProduct.quantity);
//   }
// }, [products]);
  useEffect(() => {
    dispatch(fetchProductsInCart());
    dispatch(fetchTotalInCart());
  }, [dispatch]);
  console.log(products.length);
  console.log("cart total", total);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setQuantity(value);
  };
  return (
    <div className="cart-body">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="empty-cart">
              <h1>Your OnesAndZeros Cart is Empty</h1>
              <h4>Continue shopping to add items.</h4>
            </div>
          ) : (
            <>
              <div className="cart-header">
                <div className="cart-header-contents">
                  <h1>Shopping Cart</h1>
                  <h5>Price</h5>
                </div>
                <hr />
              </div>
              <div className="cart-data">
                {products.map((product) => (
                  <div className="retrieved-data" key={product.productId}>
                    <div className="cart-retrieved-data">
                      <div className="product-img">
                        <img
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0]
                              : "path/to/default/image.png"
                          }
                          alt={product.name}
                        />
                      </div>
                      <div className="product-data">
                        <h2>{product.name}</h2>
                        <p>
                          {product.description || "No description available."}
                        </p>
                        <p className="left-quantity">
                          Only {product.quantity} left in stock - order soon
                        </p>
                        <div className="product-actions">
                          <form>
                            <div className="qty-input">
                            Qty:
                              {/* <p>Qty: {product.CartProduct.quantity}</p> */}
                              <input
                              type="number"
                              name="quantity"
                              value={quantity}
                              onChange={handleQuantityChange}
                            />
                            </div>
                            <button>Update</button>
                          </form>
                          <hr />
                          <p>Delete</p>
                        </div>
                      </div>
                      <div className="product-price">${product.price}</div>
                    </div>
                    <hr />
                  </div>
                ))}
                
              </div>
              <div className="cart-footer">
                  <div className="cart-total">
                    <h2>
                      Subtotal ({products.length} items): ${total}
                    </h2>
                  </div>
                  <button>Proceed to Checkout</button>
                </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
