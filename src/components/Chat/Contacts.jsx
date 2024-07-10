import { useQuery } from "@apollo/client";
import CancelIcon from "../UI/CancelIcon";
import classes from "./Contacts.module.css";
import Search from "./Search";
import { GET_CONTACTS_QUERY } from "../../services/contact";
import Spinner from "../UI/Spinner";
import AddIcon from "../UI/AddIcon";
import ContactCard from "./ContactCard";
import ChatSkeleton from "./ChatSkeleton";
import { useState } from "react";
import AddContact from "./AddContact";
import { useSelector } from "react-redux";

function Contacts({ open, ...props }) {
  const [openModel, setOpenModel] = useState(false);

  const { loading, data, error } = useQuery(GET_CONTACTS_QUERY);

  const chats = useSelector((state) => state.chats.chats);
  const userId = useSelector((state) => state.user.user._id);

  let content;
  if (loading) {
    content = <ChatSkeleton />;
  }

  const getChatByUserId = (userId) => {
    for (const chat of chats) {
      if (chat.users.some((user) => user._id === userId)) {
        return chat;
      }
    }
    return null;
  };

  const activeChatHandler = (contact) => {
    const chat = getChatByUserId(contact._id) || {
      ...contact,
      users: [{ _id: contact._id }, {_id: userId}],
    };
    console.log(chat);
    props.onClickContact(chat);
  };

  if (data?.getContacts) {
    content = data.getContacts.map((contact) => (
      <ContactCard
        contact={contact}
        key={contact._id}
        onClick={activeChatHandler.bind(null, contact)}
      />
    ));
  }

  if (error) {
    console.log("Something Went Wrong!");
  }

  const openModelHandler = () => {
    console.log("clicked");
    setOpenModel(true);
  };

  const closeModelHandler = () => {
    setOpenModel(false);
  };

  return (
    <div className={`${classes.contacts} ${open ? classes.open : ""}`}>
      <div className={classes.head}>
        <CancelIcon onClick={props.closeContactsList} />
        <Search />
      </div>
      <div className={classes.body}>{content}</div>
      <AddIcon className={classes.icon} onClick={openModelHandler} />
      {openModel && <AddContact onHideModel={closeModelHandler} />}
    </div>
  );
}

export default Contacts;
