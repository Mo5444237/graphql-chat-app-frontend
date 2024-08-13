import classes from "./EditProfile.module.css";
import defaultImage from "../../assets/defaultImage.png";

import { useState } from "react";

import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import NewChatIcon from "../UI/NewChatIcon";
import useInput from "../hooks/use-input";

import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import { useMutation } from "@apollo/client";
import { EDIT_PROFILE_MUTATION } from "../../services/auth";

function EditProfile({ user, ...props }) {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.length !== 0);

  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted: () => {
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
    if (nameHasError) return;
    try {
      const { data } = await editProfile({
        variables: {
          userInput: {
            name: nameValue || user?.name,
            avatar,
          },
        },
        context: {
          headers: {
            "x-apollo-operation-name": "EditProfile",
            "apollo-require-preflight": true,
          },
        },
      });

      dispatch(userActions.setUser(data.editProfile));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal onClose={props.onHideModal} className={classes.modal}>
      <div className={classes.container}>
        <h2>Edit profile</h2>
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
              label="Name"
              input={{
                id: "name",
                name: "name",
                placeholder: "name",
                type: "text",
                value: nameValue || user?.name,
                onChange: nameChangeHandler,
                onBlur: nameBlurHandler,
              }}
              hasError={nameHasError}
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

export default EditProfile;
