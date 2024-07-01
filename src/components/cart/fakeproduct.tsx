import React, { useState } from "react";
import "./fakeproduct.scss"; // Import the SCSS file
import product1 from "../../assets/images/Rectangle24.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addProductInCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const FakeProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.cart);

  const products = [
    { id: "5ced2393-9223-4eb7-bd43-5caac58a2598",image:"https://res.cloudinary.com/dyfw0di8x/image/upload/v1719751633/jihvawscg2y4f2ukfxsw.jpg", name: "mac book", description: "Architect & Engineer" },
    { id: "e956c8d3-dab8-4dad-9192-89aa28f78c64", image:'https://res.cloudinary.com/dyfw0di8x/image/upload/v1719754309/hmlrztjqjxuxxbdxtsmb.jpg',name: "watch", description: "Graphic Designer" },
    { id: "fa204699-02f7-4ef0-8407-d161617137bb",image:'https://res.cloudinary.com/dyfw0di8x/image/upload/v1719751524/jwom5uvkwa21kopenm5g.jpg', name: "lenovo laptop", description: "Software Engineer" }
  ];

  const handleAddProductInCart = async (productId: string) => {
    const quantity = 1;
    dispatch(addProductInCart({ productId, quantity }));
    // toast.success("Product added in cart successfully");
  };

  return (
    <div>
      <div>
        <h1>Fake Products:</h1>
      </div>
      <div className="product-list">
        {products.map(product => (
          <div className="card" key={product.id}>
            <img src={`${product.image}`} alt={`Product ${product.name}`} className="card-image" />
            <div className="container">
              <h4>
                <b>{product.name}</b>
              </h4>
              <p>{product.description}</p>
              <button
                type="button"
                onClick={() => handleAddProductInCart(product.id)}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeProduct;
