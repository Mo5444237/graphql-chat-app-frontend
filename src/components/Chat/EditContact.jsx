import classes from "./EditProfile.module.css";

import Modal from "../UI/Modal";
import { useMutation } from "@apollo/client";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import useInput from "../hooks/use-input";
import Input from "../UI/Input";
import {
  EDIT_CONTACT_MUTATION,
  GET_CONTACTS_QUERY,
} from "../../services/contact";
import { useSelector } from "react-redux";
import client from "../../services/graphql";

function EditContact({ chat, ...props }) {
  const {
    value: contactNameValue,
    isValid: contactNameIsValid,
    hasError: contactNameHasError,
    valueBlurHandler: contactNameBlurHandler,
    valueChangeHandler: contactNameChangeHandler,
  } = useInput((value) => value.length !== 0);

  const currentUserId = useSelector((state) => state.user.user._id);

  const contact = chat.users.find((user) => user._id !== currentUserId);

  const [editContact, { loading }] = useMutation(EDIT_CONTACT_MUTATION, {
    onCompleted: (data) => {
      props.onHideModal();
      client.refetchQueries({
        include: [GET_CONTACTS_QUERY],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactNameValue || !contact) return;
    try {
      await editContact({
        variables: {
          contactInput: {
            name: contactNameValue,
            contactId: contact._id,
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
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.avatar}>
            <Input
              className={classes.input}
              label="Contact Name"
              input={{
                id: "name",
                name: "name",
                placeholder: "Contact Name",
                type: "text",
                value: contactNameValue || chat?.name,
                onChange: contactNameChangeHandler,
                onBlur: contactNameBlurHandler,
              }}
              hasError={contactNameHasError}
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

export default EditContact;
