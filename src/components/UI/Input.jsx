import { useState } from "react";
import classes from "./Input.module.css";

function Input(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => { 
    setShowPassword((prevState) => !prevState);
  }

  return (
    <div className={`${props.className} ${classes.form__group}`}>
      <input
        {...props.input}
        className={`${classes.form__field} ${
          props.hasError ? classes.invalid : ""
          }`}
        type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
      />
      <label htmlFor={props.input.id} className={classes.form__label}>
        {props.label}
      </label>
      {props.type === "password" && props.input.value && (
        <span className={classes["show-password"]} onClick={togglePassword} >
          show
        </span>
      )}
      {props.hasError && (
        <span className={classes.error}>{props.errorMsg}</span>
      )}
      {props.serverMsg && (
        <span className={classes.error}>{props.serverMsg}</span>
      )}
    </div>
  );
}

export default Input;
