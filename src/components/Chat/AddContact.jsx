import classes from "./AddContact.module.css";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import useInput from "../hooks/use-input";

import {
  ADD_CONTACT_MUTATION,
  GET_CONTACTS_QUERY,
} from "../../services/contact";
import { useMutation } from "@apollo/client";
import client from "../../services/graphql";

function AddContact(props) {
  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueBlurHandler: fullNameBlurHandler,
    valueChangeHandler: fullNameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));

  const [addContact, { loading }] = useMutation(ADD_CONTACT_MUTATION);

  const addContactHandler = (e) => {
    e.preventDefault();
    if (!emailIsValid || !fullNameIsValid) {
      return;
    }
    addContact({
      variables: { contactInput: { email: emailValue, name: fullNameValue } },
      onCompleted: () => {
        props.onHideModel();
        client.refetchQueries({
          include: [GET_CONTACTS_QUERY],
        });
      },
    });
  };
  return (
    <Modal onClose={props.onHideModel} className={classes.modal}>
      <div className={classes.container}>
        <h2>Add Contact</h2>
        <form onSubmit={addContactHandler}>
          <Input
            className={classes.input}
            label="E-mail"
            input={{
              id: "email",
              name: "email",
              placeholder: "email",
              type: "email",
              value: emailValue,
              autoComplete: "email",
              onChange: emailChangeHandler,
              onBlur: emailBlurHandler,
            }}
            hasError={emailHasError}
            errorMsg="Enter a valid E-mail"
          />
          <Input
            className={classes.input}
            label="Name"
            input={{
              id: "name",
              name: "name",
              placeholder: "name",
              type: "text",
              value: fullNameValue,
              onChange: fullNameChangeHandler,
              onBlur: fullNameBlurHandler,
            }}
            hasError={fullNameHasError}
            errorMsg="Enter a valid Name"
          />
          <div className={classes.actions}>
            {loading ? (
              <Spinner className={classes.loader} />
            ) : (
              <Button title="Add" classes={classes.button} />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddContact;
