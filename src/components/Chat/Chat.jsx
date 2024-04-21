import { useState } from "react";
import classes from "./Chat.module.css";
import ChatInfo from "./ChatInfo";
import Message from "./Message";
import MessageInput from "./MessageInput";

const messages = [
  {
    id: 1,
    content: "Hello",
    sender: "me",
  },
  {
    id: 2,
    content: "Hi",
    sender: "other",
  },
  {
    id: 3,
    content: "How are you?",
    sender: "me",
  },
  {
    id: 4,
    content: "I'm good, thank you",
    sender: "other",
  },
  {
    id: 5,
    content: "What about you?",
    sender: "other",
  },
  {
    id: 6,
    content: "I'm good too",
    sender: "me",
  },
  {
    id: 7,
    content: "How can I help you?",
    sender: "me",
  },
  {
    id: 8,
    content: "I need help with my order",
    sender: "other",
  },
  {
    id: 9,
    content: "Sure, I can help you with that",
    sender: "me",
  },
];

function Chat({ chatData, ...props }) {
  const [showChatInfo, setShowChatInfo] = useState(false);

  const showChatInfoHandler = () => {
    setShowChatInfo(true);
  };

  const hideChatInfoHandler = () => {
    setShowChatInfo(false);
  };

  return (
    <div className={`${classes.chat} ${props.className}`}>
      {showChatInfo && (
        <ChatInfo
          className={classes.info}
          onHideChatInfo={hideChatInfoHandler}
          chatData={chatData}
        />
      )}
      <div className={classes.header}>
        <div className={classes.back} onClick={props.onHideChat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width="2rem"
            height="2rem"
            viewBox="0 0 52 52"
            data-name="Layer 1"
            id="Layer_1"
          >
            <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
          </svg>
        </div>
        <div className={classes.info} onClick={showChatInfoHandler}>
          <div className={classes.avatar}>
            <img src={chatData.avatar} alt="User" />
          </div>
          <div className={classes.content}>
            <h3>{chatData.name}</h3>
            <p>{chatData.lastSeen || "8:22 PM"}</p>
          </div>
        </div>
      </div>
      <div className={classes.body}>
        {messages.map((message) => {
          return <Message key={message.id} messageData={message} />;
        })}
      </div>
      <MessageInput />
    </div>
  );
}

export default Chat;
