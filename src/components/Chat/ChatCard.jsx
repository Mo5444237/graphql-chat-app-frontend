import { useSelector } from "react-redux";
import classes from "./ChatCard.module.css";
import defaultImage from "../../assets/defaultImage.png";

function ChatCard({ chatData, isTyping, ...props }) {
  const userId = useSelector((state) => state.user.user._id);

  const activeChatHandler = () => {
    props.onClick(chatData);
  };
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={activeChatHandler}
    >
      <div className={classes.avatar}>
        <img src={chatData.avatar || defaultImage} alt="User Image" />
      </div>
      <div className={classes.content}>
        <h3>{chatData.name}</h3>
        {isTyping && isTyping == chatData._id ? (
          <p className={classes.typing}>Typing...</p>
        ) : (
          chatData.lastMessage && (
            <p>
              <span>
                {chatData.lastMessage?.sender._id === userId
                  ? "You"
                  : chatData.lastMessage?.sender.name}
                :{" "}
              </span>
              {chatData.lastMessage?.content}
            </p>
          )
        )}
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
