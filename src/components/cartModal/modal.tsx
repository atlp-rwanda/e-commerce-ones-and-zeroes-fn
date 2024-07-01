import React, { ReactNode } from 'react';
import "./cartmodalStyles.scss";


interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const CartModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div onClick={onClose} className="modal-close-button">
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default CartModal;
