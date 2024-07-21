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
import BackIcon from "../UI/Backicon";

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
          <BackIcon/>
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
