import classes from "./ChatsList.module.css";
import { useEffect, useRef, useState } from "react";

import Menu from "./Menu";
import Chat from "./Chat";
import Search from "./Search";
import ChatCard from "./ChatCard";
import Profile from "./Profile";
import Contacts from "./Contacts";
import ChatSkeleton from "./ChatSkeleton";
import NewChatIcon from "../UI/NewChatIcon";

import { useDispatch, useSelector } from "react-redux";
import { chatsActions } from "../../store/chats-slice";
import { fetchUserChats } from "../../store/chats-actions";

import socket from "../../services/socket";
import { debounce } from "../../utils/debounce";

function ChatsList() {
  const [activeChat, setActiveChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const chats = useSelector((state) => state.chats);
  const currentUser = useSelector((state) => state.user.user?._id);
  const contacts = useSelector((state) => state.contacts.contacts);

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

  const openProfileList = () => {
    setOpenProfile(() => true);
  };

  const closeProfileList = () => {
    setOpenProfile(() => false);
  };

  const debounceMap = useRef({});

  const getDebounceFunction = (chatId, userId) => {
    const key = `${chatId}-${userId}`;
    if (!debounceMap.current[key]) {
      debounceMap.current[key] = debounce(() => {
        dispatch(chatsActions.removeIsTyping({ chatId }));
      }, 2000);
    }
    return debounceMap.current[key];
  };

  useEffect(() => {
    const handleTyping = ({ chatId, userId, user }) => {
      dispatch(chatsActions.setIsTyping({ chatId, user }));
      const debounceFunction = getDebounceFunction(chatId, userId);
      debounceFunction();
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on("newMessage", ({ message, data }) => {
      if (data) {
        dispatch(fetchUserChats());
        const contactId =
          data.type === "private"
            ? data.users.filter((user) => user._id !== currentUser)[0]._id
            : null;
        const chatName = contacts[contactId]?.name || data.name;

        if (activeChat?._id === data._id || message.sender._id === currentUser)
          setActiveChat({
            ...data,
            name: chatName,
          });
      }
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
    dispatch(chatsActions.setIsLoading(true));
    dispatch(fetchUserChats());
  }, [dispatch]);

  let content;

  const searchHandler = (term) => {
    setSearchTerm(term);
  };

  if (chats.chats) {
    content = chats.chats.map((chat) => {
      let chatData = chat;
      // get contact name
      const contactId =
        chat.type === "private"
          ? chat.users.filter((user) => user._id !== currentUser)[0]._id
          : null;
      if (contacts[contactId]) {
        chatData = { ...chatData, name: contacts[contactId].name };
      }

      return (
        <div className={classes.chat} key={chat._id}>
          <ChatCard
            chatData={chatData}
            onClick={activeChatHandler}
            className={activeChat?._id === chat._id ? classes.active : null}
            isTyping={chats.typing[chat._id] ? chat._id : null}
            typingUser={chats.typing[chat._id]}
          />
        </div>
      );
    });

    if (searchTerm) {
      content = content.filter((chat) => {
        let name = chat.props.children.props.chatData.name;
        return name.toLowerCase().includes(searchTerm?.toLowerCase());
      });
    }
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
          <Menu openProfile={openProfileList} />
          <Search searchTerm={searchHandler} />
        </div>
        <div className={classes["chats-list"]}>
          {content}
          <Contacts
            open={openContacts}
            closeContactsList={closeContactsList}
            onClickContact={activeChatHandler}
          />
          <Profile open={openProfile} closeProfile={closeProfileList} />
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
          isTyping={chats.typing[activeChat._id] ? activeChat._id : null}
          typingUser={chats.typing[activeChat._id]}
        />
      ) : (
        <p className={classes.select}>Select a chat to start conversation</p>
      )}
    </div>
  );
}

export default ChatsList;
