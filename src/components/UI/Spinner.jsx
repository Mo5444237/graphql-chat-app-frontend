import classes from "./Spinner.module.css";

function Spinner(props) {
  return <div className={`${props.className} ${classes.spinner}`}></div>;
}

export default Spinner;
