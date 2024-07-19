import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.scss";

interface ToastProps {
  message: string | undefined;
  messageType: any;
}

function Toast({ messageType, message }: ToastProps) {
  useEffect(() => {
    if (messageType && message) {
      if (messageType === "success") {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }, [messageType, message]);

  return (
    <ToastContainer className="custom-toast-container" />
  );
}

export default Toast;