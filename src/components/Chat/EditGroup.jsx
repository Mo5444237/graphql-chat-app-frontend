import classes from "./EditProfile.module.css";
import defaultImage from "../../assets/defaultImage.png";

import { useState } from "react";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import NewChatIcon from "../UI/NewChatIcon";
import useInput from "../hooks/use-input";

import { useMutation } from "@apollo/client";
import { EDIT_CHAT_MUTATION } from "../../services/chat";

function EditGroup({ chat, ...props }) {
  const {
    value: groupNameValue,
    isValid: groupNameIsValid,
    hasError: groupNameHasError,
    valueBlurHandler: groupNameBlurHandler,
    valueChangeHandler: groupNameChangeHandler,
  } = useInput((value) => value.length !== 0);

  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [editGroup, { loading }] = useMutation(EDIT_CHAT_MUTATION, {
    onCompleted: (data) => {
      props.onHideModal();
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupNameHasError) return;
    try {
      const { data } = await editGroup({
        variables: {
          chatInput: {
            chatId: chat._id,
            name: groupNameValue || chat?.name,
            avatar,
          },
        },
        context: {
          headers: {
            "x-apollo-operation-name": "EditGroup",
            "apollo-require-preflight": true,
          },
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal onClose={props.onHideModal} className={classes.modal}>
      <div className={classes.container}>
        <h2>Edit Group</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.avatar}>
            <div className={classes.img}>
              <img src={imageUrl || defaultImage} alt="User-image" />
              <label htmlFor="file-upload" className={classes.edit}>
                <NewChatIcon />
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <Input
              className={classes.input}
              label="Group Name"
              input={{
                id: "name",
                name: "name",
                placeholder: "Group Name",
                type: "text",
                value: groupNameValue || chat?.name,
                onChange: groupNameChangeHandler,
                onBlur: groupNameBlurHandler,
              }}
              hasError={groupNameHasError}
              errorMsg="Enter a valid Name"
            />
            <div className={classes.actions}>
              {loading ? (
                <Spinner className={classes.loader} />
              ) : (
                <Button title="Save" classes={classes.button} />
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditGroup;
