import React, { ReactNode } from 'react';
import "./cartmodalStyles.scss";


interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const CartModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal-content">
        <div onClick={onClose} className="cart-modal-close-button">
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default CartModal;
