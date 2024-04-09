import classes from "./Message.module.css";

function Message({ messageData }) {
  return (
    <div
      className={`${classes.message} ${
        messageData.sender === "me" ? classes.me : null
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