import classes from "./Chat.module.css";
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

function Chat({ chatData }) {
  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <div className={classes.info}>
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
