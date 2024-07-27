import { useQuery } from "@apollo/client";
import CancelIcon from "../UI/CancelIcon";
import classes from "./Contacts.module.css";
import Search from "./Search";
import { GET_CONTACTS_QUERY } from "../../services/contact";
import AddIcon from "../UI/AddIcon";
import ContactCard from "./ContactCard";
import ChatSkeleton from "./ChatSkeleton";
import { useState } from "react";
import AddContact from "./AddContact";
import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../../store/contacts-slice";

function Contacts({ open, ...props }) {
  const [openModel, setOpenModel] = useState(false);
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(GET_CONTACTS_QUERY, {
    onCompleted: (data) => {
      console.log(data.getContacts)
      dispatch(contactsActions.setContacts(data.getContacts));
    },
    notifyOnNetworkStatusChange: true
  });

  const chats = useSelector((state) => state.chats.chats);
  const userId = useSelector((state) => state.user.user?._id);

  let content;
  if (loading) {
    content = <ChatSkeleton />;
  }

  const getChatByUserId = (contact) => {
    for (const chat of chats) {
      if (
        chat.type !== "group" &&
        chat.users.some((user) => user._id === contact._id)
      ) {
        return {...chat, name: contact.name};
      }
    }
    return null;
  };

  const activeChatHandler = (contact) => {
    const chat = getChatByUserId(contact) || {
      ...contact,
      users: [{ _id: contact._id }, { _id: userId }],
    };
    props.onClickContact(chat);
    props.closeContactsList();
  };

  content = Object.entries(contacts).map(([key, contact]) => (
    <ContactCard
      contact={contact}
      key={contact._id + contact.name}
      onClick={activeChatHandler.bind(null, contact)}
    />
  ));

  if (error) {
    console.log("Something Went Wrong!");
  }

  const openModelHandler = () => {
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
