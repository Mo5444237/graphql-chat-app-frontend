import { useSelector } from "react-redux";

import Search from "./Search";
import classes from "./GroupList.module.css";
import CancelIcon from "../UI/CancelIcon";
import { useState } from "react";
import useInput from "../hooks/use-input";
import Input from "../UI/Input";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT_MUTATION } from "../../services/chat";
import Spinner from "../UI/Spinner";
import GroupMember from "./GroupMember";

function GroupList({ open, ...props }) {
  const {
    value: groupNameValue,
    isValid: groupNameIsValid,
    hasError: groupNameHasError,
    valueBlurHandler: groupNameBlurHandler,
    valueChangeHandler: groupNameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const contacts = useSelector((state) => state.contacts.contacts);
  const [usersList, setUsersList] = useState([]);
  const [createGroup, { loading }] = useMutation(CREATE_CHAT_MUTATION, {
    onCompleted: (data) => {
      props.closeGroupList();
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

  const createGroupHandler = async () => {
    if (!groupNameIsValid && usersList.length < 2) return;

    try {
      await createGroup({
        variables: {
          chatInput: {
            users: usersList,
            name: groupNameValue,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const content = Object.entries(contacts).map(([key, contact]) => {
    return (
      <GroupMember
        toggleUserHandler={toggleUser}
        contact={contact}
        key={contact._id}
      />
    );
  });

  return (
    <div className={`${classes.container} ${open ? classes.open : ""}`}>
      <div className={classes.head}>
        <CancelIcon onClick={props.closeGroupList} />
        <Search />
      </div>
      <div className={classes.body}>
        {usersList.length > 1 && (
          <div className={classes.submit}>
            <Input
              className={classes.input}
              label="Group Name"
              input={{
                autoComplete: "off",
                id: "name",
                name: "name",
                placeholder: "name",
                type: "text",
                value: groupNameValue,
                onChange: groupNameChangeHandler,
                onBlur: groupNameBlurHandler,
              }}
              errorMsg="Enter a valid Name"
            />
            <div className={classes.btn} onClick={createGroupHandler}>
              {loading ? <Spinner className={classes.loader} /> : "Create"}
            </div>
          </div>
        )}
        {content}
      </div>
    </div>
  );
}

export default GroupList;
