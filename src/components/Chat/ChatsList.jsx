import { useCallback, useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import classes from "./ChatsList.module.css";
import Chat from "./Chat";
import Search from "./Search";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserChats } from "../../store/chats-actions";
import ChatSkeleton from "./ChatSkeleton";
import NewChatIcon from "../UI/NewChatIcon";
import Contacts from "./Contacts";
import { chatsActions } from "../../store/chats-slice";
import socket from "../../services/socket";
import { debounce } from "../../utils/debounce";

function ChatsList() {
  const [activeChat, setActiveChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [isTyping, setIsTyping] = useState("");

  const chats = useSelector((state) => state.chats);
  const currentUser = useSelector((state) => state.user.user?._id);
  const dispatch = useDispatch();

  const activeChatHandler = (chatData) => {
    setActiveChat(chatData);
    setShowChat(true);
  };

  const hideChatHandler = () => {
    setActiveChat(null);
    setShowChat(false);
  };

  const openContactsList = () => {
    setOpenContacts(() => true);
  };

  const closeContactsList = () => {
    setOpenContacts(() => false);
  };

  // Debounce clear typing state after 2 seconds
  const clearTypingState = useCallback(
    debounce(() => setIsTyping(""), 2000),
    []
  );

  useEffect(() => {
    const handleTyping = ({ chatId, userId }) => {
      setIsTyping(chatId);
      clearTypingState();
    };
    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [clearTypingState]);

  useEffect(() => {
    socket.on("newMessage", ({ message }) => {
      dispatch(
        chatsActions.updateChatMessages({
          chatId: message.chatId,
          message: message,
          currentUser,
          activeChat: activeChat?._id,
        })
      );
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, currentUser, activeChat]);

  useEffect(() => {
    dispatch(fetchUserChats());
  }, [dispatch, chats.changed]);

  let content;

  if (chats.chats) {
    content = chats.chats.map((chat) => (
      <div className={classes.chat} key={chat._id}>
        <ChatCard
          chatData={chat}
          onClick={activeChatHandler}
          className={activeChat?._id === chat._id ? classes.active : null}
          isTyping={isTyping}
        />
      </div>
    ));
  }

  if (chats.isLoading) {
    content = <ChatSkeleton />;
  }

  if (chats.error) {
    console.log(chats.error);
  }

  return (
    <div className={classes["chats-container"]}>
      <div className={classes.chats}>
        <div className={classes.head}>
          <Menu />
          <Search />
        </div>
        <div className={classes["chats-list"]}>
          {content}
          <Contacts
            open={openContacts}
            closeContactsList={closeContactsList}
            onClickContact={activeChatHandler}
          />
        </div>
        <NewChatIcon
          className={classes["new-chat"]}
          onClick={openContactsList}
        />
      </div>
      {activeChat ? (
        <Chat
          chatData={activeChat}
          key={activeChat._id}
          onHideChat={hideChatHandler}
          className={`${showChat ? classes["show-chat"] : undefined}`}
          isTyping={isTyping}
        />
      ) : (
        <p className={classes.select}>Select a chat to start conversation</p>
      )}
    </div>
  );
}

export default ChatsList;
