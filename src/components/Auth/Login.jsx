import { Link, redirect } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../hooks/use-input";

import classes from "./Auth.module.css";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../services/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import Spinner from "../UI/Spinner";
import { chatsActions } from "../../store/chats-slice";
import socket from "../../services/socket";

function Login() {

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueBlurHandler: passwordBlurHandler,
    valueChangeHandler: passwordChangeHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    fetchPolicy: "no-cache"
  });
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userData = {
      email: emailValue,
      password: passwordValue,
    };

    try {
      const { data } = await login({ variables: { userInput: userData } });
      if (data.login) {
        socket.emit("joinRoom", data.login.user._id);
        dispatch(userActions.setUser(data.login.user));
        localStorage.setItem("token", data.login.token);
        dispatch(chatsActions.setChatsChanged(true));
      }
      redirect("/");
    } catch (error) {
      passwordReset();
      console.log(error.graphQLErrors[0]);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes["container-form"]}>
        <form method="POST" onSubmit={submitHandler}>
          <h1>Welcome back</h1>
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
            label="Password"
            type="password"
            input={{
              id: "password",
              name: "password",
              placeholder: "password",
              type: "password",
              value: passwordValue,
              autoComplete: "current-password",
              onChange: passwordChangeHandler,
              onBlur: passwordBlurHandler,
            }}
          />
          <div className={classes.actions}>
            <Button
              disabled={!formIsValid}
              type="submit"
              title={
                loading ? <Spinner className={classes.spinner} /> : "login"
              }
            />
          </div>
          <div className={classes.options}>
            <p>
              Don't have an account? <Link to="/auth">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
