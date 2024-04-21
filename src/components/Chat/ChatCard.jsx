import classes from "./ChatCard.module.css";

function ChatCard({ chatData, ...props }) {
  const activeChatHandler = () => {
    props.onClick(chatData);
  };
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={activeChatHandler}
    >
      <div className={classes.avatar}>
        <img src={chatData.avatar} alt="User" />
      </div>
      <div className={classes.content}>
        <h3>{chatData.name}</h3>
        <p>{chatData.lastMessage}</p>
      </div>
      {chatData?.unreadMessages > 0 && (
        <div className={classes["unread-messages"]}>
          {chatData.unreadMessages}
        </div>
      )}
    </div>
  );
}

export default ChatCard;
