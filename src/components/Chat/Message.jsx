import { useSelector } from "react-redux";
import classes from "./Message.module.css";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import { getTime } from "../../utils/getTime";
import TimeIcon from "../UI/TimeIcon";

function Message({ messageData, unSent, ...props }) {
  const userId = useSelector((state) => state.user.user._id);
  const [viewImage, setViewImage] = useState();
  const time = getTime(messageData.createdAt);

  let content =
    messageData.type == "image" ? (
      <div className={classes.img}>
        {viewImage && (
          <ImagePreview
            onHideModal={() => setViewImage(false)}
            img={messageData.content}
          />
        )}
        <img
          src={messageData.content}
          alt="An-Image"
          onClick={() => setViewImage(true)}
        />
        {messageData.caption && <p>{messageData.caption}</p>}
      </div>
    ) : (
      <p>{messageData.content}</p>
    );

  return (
    <div
      className={`${classes.message} ${props.className} ${
        messageData.sender._id === userId ? classes.me : null
      }`}
    >
      {content}
      <div className={classes.meta}>
        <span className={classes.time}>{time}</span>
        {unSent && <TimeIcon className={classes.unSent} />}
      </div>
    </div>
  );
}

export default Message;
