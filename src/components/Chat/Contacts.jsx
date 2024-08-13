import classes from "./Contacts.module.css";
import { useEffect, useState } from "react";

import Search from "./Search";
import AddContact from "./AddContact";
import ContactCard from "./ContactCard";
import ChatSkeleton from "./ChatSkeleton";
import GroupList from "./GroupList";
import AddIcon from "../UI/AddIcon";
import GroupIcon from "../UI/GroupIcon";
import CancelIcon from "../UI/CancelIcon";

import { useDispatch, useSelector } from "react-redux";
import { contactsActions } from "../../store/contacts-slice";

import { useQuery } from "@apollo/client";
import { GET_CONTACTS_QUERY } from "../../services/contact";
import socket from "../../services/socket";

function Contacts({ open, ...props }) {
  const [openModal, setOpenModal] = useState(false);
  const [openGroupList, setOpenGroupList] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const { loading, data, error } = useQuery(GET_CONTACTS_QUERY, {
    onCompleted: (data) => {
      dispatch(contactsActions.setContacts(data.getContacts));
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    socket.on("userStatusChanged", ({ userId, online, lastSeen }) => {
      console.log(userId);
      dispatch(
        contactsActions.updateContactStatus({ userId, online, lastSeen })
      );
    });

    return () => {
      socket.off("userStatusChanged");
    };
  }, [dispatch]);

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
        return { ...chat, name: contact.name };
      }
    }
    return null;
  };

  const activeChatHandler = (contact) => {
    const chat = getChatByUserId(contact) || {
      ...contact,
      type: "private",
      users: [{ _id: contact._id }, { _id: userId }],
    };
    props.onClickContact(chat);
    props.closeContactsList();
  };

  content = Object.entries(contacts).map(([key, contact]) => (
    <ContactCard
      contact={contact}
      key={contact._id}
      onClick={activeChatHandler.bind(null, contact)}
    />
  ));

  const searchHandler = (term) => {
    setSearchTerm(term);
  };

  if (searchTerm) {
    content = content.filter((contact) =>
      contacts[contact.key]?.name
        .toLowerCase()
        .includes(searchTerm?.toLowerCase())
    );
  }

  if (error) {
    console.log("Something Went Wrong!");
  }

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModelHandler = () => {
    setOpenModal(false);
  };

  const openGroupListHandler = () => {
    setOpenGroupList(true);
    props.closeContactsList();
  };

  const closeGroupListHandler = () => {
    setOpenGroupList(false);
  };

  return (
    <div className={`${classes.contacts} ${open ? classes.open : ""}`}>
      <div className={classes.head}>
        <CancelIcon onClick={props.closeContactsList} />
        <Search searchTerm={searchHandler} />
      </div>
      <div className={classes.body}>
        <GroupList
          open={openGroupList}
          closeGroupList={closeGroupListHandler}
        />
        <div className={classes.group} onClick={openGroupListHandler}>
          <GroupIcon />
          <p>Create Group</p>
        </div>
        {content}
      </div>
      <AddIcon className={classes.icon} onClick={openModalHandler} />
      {openModal && <AddContact onHideModel={closeModelHandler} />}
    </div>
  );
}

export default Contacts;
