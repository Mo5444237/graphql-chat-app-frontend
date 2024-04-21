import classes from "./Button.module.css";

function Button(props) {
  return (
    <button {...props} className={`${classes.button} ${props.className}`}>
      {props.title}
    </button>
  );
}

export default Button;
