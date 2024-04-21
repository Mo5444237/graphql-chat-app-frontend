import { Link } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../hooks/use-input";

import classes from "./Auth.module.css";

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

  return (
    <div className={classes.container}>
      <div className={classes["container-form"]}>
        <form action="">
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
              onChange: passwordChangeHandler,
              onBlur: passwordBlurHandler,
            }}
          />
          <div className={classes.actions}>
            <Button disabled={!formIsValid} type="submit" title="Login" />
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
