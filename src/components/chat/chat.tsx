import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import socket from "./socket";
import "./chat.scss";
import { fetchMessages } from "../../redux/slices/chatSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { format, isToday, isYesterday, parseISO } from "date-fns";

interface DecodedToken {
  userId: string;
  role: string;
}

interface Message {
  timestamp: string;
  userId: string;
  username: string;
  message: string;
}

interface TypingUser {
  userId: string;
  username: string;
}

function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.chat
  );
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState<TypingUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Decode the user ID from the token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken<DecodedToken>(token);
      if (decodedToken) {
        setUserId(decodedToken.userId);
      }
    }

    // Dispatch the fetchMessages action to get messages from the backend
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    // Socket event listeners
    socket.on("newMessage", (message: Message) => {
      dispatch({ type: "chat/addMessage", payload: message });
      setSending(false);
      resetMessage();
      console.log("message received", message);
    });

    socket.on("typing", (typingUser: TypingUser) => {
      setTyping(typingUser);
      setTimeout(() => setTyping(null), 2000);
    });

    socket.on("Left", (userLeft: TypingUser) => {
      setTyping(userLeft);
      setTimeout(() => setTyping(null), 1000);
    });

    return () => {
      // Clean up socket event listeners
      socket.off("newMessage");
      socket.off("typing");
      socket.off("Left");
    };
  }, [dispatch]);

  const resetMessage = () => {
    setMessage("");
  };

  const SendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      setSending(true);
      socket.emit("message", message, () => {
        resetMessage();
        setSending(false);
      });
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    socket.emit("typing");
  };

  const isValidString = (value: any) => {
    return typeof value === "string" && value.trim() !== "";
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      if (isToday(date)) {
        return `Today at ${format(date, "HH:mm")}`;
      } else if (isYesterday(date)) {
        return `Yesterday at ${format(date, "HH:mm")}`;
      } else {
        return format(date, "dd/MM/yyyy HH:mm");
      }
    } catch (error) {
      console.error("Invalid timestamp:", timestamp);
      return "Invalid date";
    }
  };

  return (
    <div className="all">
      <div className="chat-container">
        <div className="titlez">CHAT</div>
        <div className="message">
          {loading ? (
            <p className="display">Loading messages...</p>
          ) : error ? (
            <p className="display">No messages yet</p>
          ) : (
            messages.map((messageObj: Message, index: number) => (
              <div className="message-container" key={index}>
                {userId === messageObj.userId ? (
                  <div className="message-left">
                    <p className="chat">
                      {isValidString(messageObj?.message)
                        ? messageObj.message
                        : "No message"}
                      <span className="time">
                        sent {formatTimestamp(messageObj.timestamp)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="message-right">
                    <p className="chat">
                      <strong className="username">
                        {isValidString(messageObj?.username)
                          ? messageObj.username
                          : "Unknown"}
                      </strong>
                      {isValidString(messageObj?.message)
                        ? messageObj.message
                        : "No message"}
                      <span className="time">
                        sent {formatTimestamp(messageObj.timestamp)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
          {typing && userId !== typing.userId && (
            <div className="typing-indicator">
              <p>{isValidString(typing?.username) ? typing.username : "Someone"} is typing...</p>
            </div>
          )}
        </div>
        <form onSubmit={SendMessage} method="POST" className="msg-form">
          <textarea
            className="message-input"
            onChange={handleMessage}
            value={message}
            placeholder="Write your message..."
          ></textarea>
          <button type="submit" className="send-button" disabled={sending}>
            {sending ? (
              <span className="loading-spinner"><i className="fa-solid fa-spinner"></i></span> 
            ) : (
              <span>
                <i className="fas fa-paper-plane"></i>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;