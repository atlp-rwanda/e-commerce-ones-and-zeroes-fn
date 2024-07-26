import React, { useState } from 'react';
import './floatingButton.scss';
import ChatModal from '../chatModal/chatModal';
import Chat from '../chat/chat';
import { toast } from "react-toastify";


const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; 
};

const FloatingButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isAuthenticated()) {
      setIsModalVisible(true);
    } else {
      
      toast.error("You need to be logged in to access the chat.");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <button className="floating-button" onClick={openModal}>
        <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/228BE6/speech-bubble-with-dots.png" alt="speech-bubble-with-dots"/>
      </button>
      
      {isModalVisible && (
        <ChatModal onClose={closeModal}>
          <Chat />
        </ChatModal>
      )}
    
    </div>
  );
};

export default FloatingButton;
