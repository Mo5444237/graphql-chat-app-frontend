import classes from "./Message.module.css";

import ImagePreview from "./ImagePreview";
import TimeIcon from "../UI/TimeIcon";

import { useSelector } from "react-redux";
import { useState } from "react";

import { getTime } from "../../utils/getTime";

function ImageMessage({ messageData }) {
  const [viewImage, setViewImage] = useState();
  return (
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
  );
}

function Message({ messageData, unSent, ...props }) {
  const userId = useSelector((state) => state.user.user._id);
  const contacts = useSelector((state) => state.contacts.contacts);
  const time = getTime(messageData.createdAt);

  let content =
    messageData.type == "image" ? (
      <ImageMessage messageData={messageData} />
    ) : (
      <p>{messageData.content}</p>
    );

  return (
    <div
      className={`${classes.message} ${props.className} ${
        messageData.sender._id === userId ? classes.me : null
      } ${messageData.type === "event" ? classes.event : null} 
      ${messageData.type === "image" ? classes.image : null}`}
    >
      {props.chatType === "group" && messageData.sender._id !== userId && (
        <p className={classes.name}>
          {contacts[messageData.sender._id]?.name || messageData.sender.name}
        </p>
      )}
      {content}
      <div className={classes.meta}>
        <span className={classes.time}>{time}</span>
        {unSent && <TimeIcon className={classes.unSent} />}
      </div>
    </div>
  );
}

export default Message;
