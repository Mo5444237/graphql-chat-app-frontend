import classes from "./ChatCard.module.css";
import defaultImage from "../../assets/defaultImage.png";

import { useSelector } from "react-redux";

function ChatCard({ chatData, isTyping, typingUser, ...props }) {
  const userId = useSelector((state) => state.user.user?._id);
  const blockedUsers = useSelector((state) => state.user.user?.blockedUsers);
  const contacts = useSelector((state) => state.contacts.contacts);

  const receiver =
    chatData.type === "private" &&
    chatData.users.find((user) => user._id !== userId);

  const isBlocked = blockedUsers?.find((user) => user._id === receiver._id);

  const lastMessage = isBlocked
    ? "You Blocked This Contact"
    : chatData.lastMessage;

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
        {isTyping && isTyping == chatData._id && !isBlocked ? (
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
                {chatData.lastMessage?.sender._id === userId || isBlocked
                  ? ""
                  : `${chatData.lastMessage?.sender.name}: `}
              </span>
              {lastMessage?.type == "image"
                ? "sent an image"
                : lastMessage?.content || lastMessage}
            </p>
          )
        )}
      </div>
      {chatData?.unreadMessagesCount > 0 && (
        <div className={classes["unread-messages"]}>
          {chatData.unreadMessagesCount}
        </div>
      )}
      {!isBlocked && contacts[receiver._id]?.online && (
        <span className={classes.status} title="active"></span>
      )}
    </div>
  );
}

export default ChatCard;
