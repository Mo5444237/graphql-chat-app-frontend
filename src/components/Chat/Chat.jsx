import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Chat.module.css";
import ChatInfo from "./ChatInfo";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatMessages,
  markMessagesAsRead,
} from "../../store/chats-actions";

import defaultImage from "../../assets/defaultImage.png";
import { debounce } from "../../utils/debounce";

function Chat({ chatData, isTyping, ...props }) {
  const [showChatInfo, setShowChatInfo] = useState(false);

  const messages = useSelector((state) => state.chats.messages[chatData._id]);

  const scrollRef = useRef();
  const dispatch = useDispatch();

  const showChatInfoHandler = () => {
    setShowChatInfo(true);
  };

  const hideChatInfoHandler = () => {
    setShowChatInfo(false);
  };

  const debouncedMarkMessagesAsRead = useCallback(
    debounce((chatId) => {
      dispatch(markMessagesAsRead(chatId));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchChatMessages(chatData._id));
  }, [dispatch, chatData._id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    console.log("Called");
    debouncedMarkMessagesAsRead(chatData._id);
  }, [messages, debouncedMarkMessagesAsRead]);

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
            <img src={chatData.avatar || defaultImage} alt="User" />
          </div>
          <div className={classes.content}>
            <h3>{chatData.name}</h3>
            {isTyping ? (
              <p className={classes.typing}>Typing...</p>
            ) : (
              <p>{chatData?.lastSeen}</p>
            )}
          </div>
        </div>
      </div>
      <div className={classes.body} ref={scrollRef}>
        {messages &&
          messages.map((message) => {
            return <Message key={message._id} messageData={message} />;
          })}
      </div>
      <MessageInput chatId={chatData._id} users={chatData.users} />
    </div>
  );
}

export default Chat;
