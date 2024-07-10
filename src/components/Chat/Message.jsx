import { useSelector } from "react-redux";
import classes from "./Message.module.css";

function Message({ messageData, ...props }) {
  const userId = useSelector(state => state.user.user._id);
  return (
    <div
      className={`${classes.message} ${props.className} ${
        messageData.sender._id === userId ? classes.me : null
      }`}
    >
      <p>{messageData.content}</p>
          <div className={classes.meta}>
        <span className={classes.time}>{messageData.time || "1:25 PM"}</span>
      </div>
    </div>
  );
}

export default Message;