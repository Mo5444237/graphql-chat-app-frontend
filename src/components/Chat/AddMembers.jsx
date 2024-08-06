import classes from "./AddMembers.module.css";
import defaultImage from "../../assets/defaultImage.png";

import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../UI/Modal";
import Search from "./Search";
import BackIcon from "../UI/Backicon";
import GroupMember from "./GroupMember";

import { ADD_USERS_TO_CHAT } from "../../services/chat";
import { useMutation } from "@apollo/client";
import Spinner from "../UI/Spinner";

function AddMembers({chatId, ...props}) {
  const contacts = useSelector((state) => state.contacts.contacts);
  const [usersList, setUsersList] = useState([]);
  const [AddUsers, { loading }] = useMutation(ADD_USERS_TO_CHAT, {
    onCompleted: (data) => {
      props.closeAddModal();
      setUsersList([]);
    },
  });

  const toggleUser = (userId) => {
    const userIndex = usersList.findIndex((user) => user === userId);

    if (userIndex >= 0) {
      setUsersList((prev) => prev.filter((user) => user !== userId));
    } else {
      setUsersList((prev) => [...prev, userId]);
    }
  };

  const AddUsersHandler = async () => {
    if (!chatId && usersList.length < 1) return;

    try {
      await AddUsers({
        variables: {
          chatInput: {
            userIds: usersList,
            chatId: chatId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const currentMembersList = {};
  props.currentMembers.forEach((member) => {
    currentMembersList[member._id] = member._id;
  });

  const content = Object.entries(contacts).map(([key, contact]) => {
    if (currentMembersList[contact._id]) return;
    return (
      <GroupMember
        toggleUserHandler={toggleUser}
        contact={contact}
        key={contact._id}
      />
    );
  });

  const selected = usersList.map((user) => {
    return (
      <div className={classes.user}>
        <img src={contacts[user].avatar || defaultImage} alt="User Avatar" />
        <p>{contacts[user].name}</p>
      </div>
    );
  });

  return (
    <Modal className={classes.modal} onClose={props.closeAddModal}>
      <div className={classes.head}>
        <Search />
        <BackIcon className={classes.back} onClick={props.closeAddModal} />
      </div>
      <div className={classes.body}>
        {usersList.length > 0 && (
          <div className={classes.submit}>
            <div className={classes.users}>{selected}</div>
            <div className={classes.btn} onClick={AddUsersHandler}>
              {loading ? <Spinner className={classes.loader} /> : "ADD"}
            </div>
          </div>
        )}
        {content}
      </div>
    </Modal>
  );
}

export default AddMembers;
