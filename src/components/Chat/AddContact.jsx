import { useMutation } from "@apollo/client";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import useInput from "../hooks/use-input";
import classes from "./AddContact.module.css";
import {
  ADD_CONTACT_MUTATION,
  GET_CONTACTS_QUERY,
} from "../../services/contact";
import client from "../../services/graphql";
import Spinner from "../UI/Spinner";

function AddContact(props) {
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
    if (!emailIsValid) {
      return;
    }
    addContact({
      variables: { contactInput: { email: emailValue } },
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
