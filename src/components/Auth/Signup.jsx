import { Link } from "react-router-dom";

import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../hooks/use-input";

import classes from "./Auth.module.css";

function Signup() {
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

  const {
    value: passwordConfirmationValue,
    isValid: passwordConfirmationIsValid,
    hasError: passwordConfirmationHasError,
    valueBlurHandler: passwordConfirmationBlurHandler,
    valueChangeHandler: passwordConfirmationChangeHandler,
    reset: passwordConfirmationReset,
  } = useInput((value) => value === passwordValue);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid && passwordConfirmationIsValid) {
    formIsValid = true;
  }

  return (
    <div className={classes.container}>
      <div className={classes["container-form"]}>
        <form action="">
          <h1>Create Account</h1>
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
          <Input
            className={classes.input}
            label="Password Confirmation"
            type="password"
            input={{
              id: "passwordConfirmation",
              name: "passwordConfirmation",
              placeholder: "password Confirmation",
              type: "password",
              value: passwordConfirmationValue,
              onChange: passwordConfirmationChangeHandler,
              onBlur: passwordConfirmationBlurHandler,
            }}
            hasError={passwordConfirmationHasError}
            errorMsg="Passwords do not match"
          />
          <div className={classes.actions}>
            <Button disabled={!formIsValid} type="submit" title="Sign Up" />
          </div>
          <div className={classes.options}>
            <p>
              Already have an account? <Link to="/auth?mode=login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
