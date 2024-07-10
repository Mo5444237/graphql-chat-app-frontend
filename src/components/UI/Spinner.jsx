import classes from "./Spinner.module.css";

function Spinner(props) {
  return <div className={`${classes.spinner} ${props.className}`}></div>;
}

export default Spinner;
