import { useSelector } from "react-redux";
import classes from "./ChatCard.module.css";
import defaultImage from "../../assets/defaultImage.png";

function ChatCard({ chatData, isTyping, typingUser, ...props }) {
  const userId = useSelector((state) => state.user.user._id);
  const contacts = useSelector((state) => state.contacts.contacts);

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
          <p className={classes.typing}>
            {chatData.type === "group"
              ? `${contacts[typingUser._id]?.name || typingUser.name} ${" "}`
              : ""}
            typing...
          </p>
        ) : (
          chatData.lastMessage && (
            <p className={chatData?.unreadMessagesCount ? classes.unread : ""}>
              <span>
                {chatData.lastMessage?.sender._id === userId
                  ? "You"
                  : chatData.lastMessage?.sender.name}
                :{" "}
              </span>
              {chatData.lastMessage?.type == "image"
                ? "sent an image"
                : chatData.lastMessage?.content}
            </p>
          )
        )}
      </div>
      {chatData?.unreadMessagesCount > 0 && (
        <div className={classes["unread-messages"]}>
          {chatData.unreadMessagesCount}
        </div>
      )}
    </div>
  );
}

export default ChatCard;
