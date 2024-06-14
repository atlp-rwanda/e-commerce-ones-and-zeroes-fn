import React, { ReactNode } from 'react';
import "../styles/style.scss";


interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
