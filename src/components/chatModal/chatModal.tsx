import React, { ReactNode } from 'react';
import './chatmodalStyles.scss';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const ChatModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal-content">
        <div onClick={onClose} className="chat-modal-close-button">
         
        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/228BE6/cancel.png" alt="cancel"/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChatModal;
