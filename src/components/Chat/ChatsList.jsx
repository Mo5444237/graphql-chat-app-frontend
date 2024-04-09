import { useState } from "react";
import ChatCard from "./ChatCard";
import classes from "./ChatsList.module.css";
import Chat from "./Chat";
import Search from "./Search";

const chats = [
  {
    id: 1,
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740",
    name: "John Doe",
    lastMessage: "Hey there! How are you?",
  },
  {
    id: 2,
    avatar:
      "https://images.assetsdelivery.com/compings_v2/elvie15veronika/elvie15veronika2005/elvie15veronika200500053.jpg",
    name: "Jane Doe",
    lastMessage: "I'm good. How about you?",
  },
  {
    id: 3,
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740",
    name: "John Smith",
    lastMessage: "Hey there! How are you?",
  },
  {
    id: 4,
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740",
    name: "Jane Smith",
    lastMessage: "I'm good. How about you?",
  },
];

function ChatsList() {
  const [activeChat, setActiveChat] = useState();

  const activeChatHandler = (chatData) => {
    console.log(chatData);
    setActiveChat(chatData);
  };

  return (
    <div className={classes["chats-container"]}>
      <div className={classes.chats}>
        <h1>Chats</h1>
        <Search />
        <div className={classes["chats-list"]}>
          {chats.map((chat) => (
            <div className={classes.chat}>
              <ChatCard
                key={chat.id}
                chatData={chat}
                onClick={activeChatHandler}
                className={activeChat?.id === chat.id ? classes.active : null}
              />
            </div>
          ))}
        </div>
      </div>
      {activeChat ? (
        <Chat chatData={activeChat} />
      ) : (
        <p className={classes.select}>Select a chat to start conversation</p>
      )}
    </div>
  );
}

export default ChatsList;
