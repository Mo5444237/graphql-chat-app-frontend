import classes from "./ChatInfo.module.css";

import { useState } from "react";
import Modal from "../UI/Modal";
import CancelIcon from "../UI/CancelIcon";
import BlockIcon from "../UI/BlockIcon";

import defaultImage from "../../assets/defaultImage.png";
import ImagePreview from "./ImagePreview";

const images = [
  {
    id: 1,
    src: "https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118",
  },
  {
    id: 2,
    src: "https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118",
  },
  {
    id: 3,
    src: "https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118",
  },
  {
    id: 4,
    src: "https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118",
  },
];

function ChatInfo({ chatData, ...props }) {
  const [viewImage, setViewImage] = useState(false);

  return (
    <Modal className={classes.modal} onClose={props.onHideChatInfo}>
      <div className={classes.header}>
        <h2>Chat Details</h2>
        <CancelIcon className={classes.cancel} onClick={props.onHideChatInfo} />
      </div>
      <div className={classes.chat}>
        {viewImage && (
          <ImagePreview
            img={chatData.avatar || defaultImage}
            onHideModal={() => setViewImage(false)}
          />
        )}
        <img
          src={chatData.avatar || defaultImage}
          alt="User"
          onClick={() => setViewImage(true)}
        />
        <h3>{chatData.name}</h3>
      </div>
      <div className={classes.media}>
        <h3>Media</h3>
        <div className={classes.images}>
          {images.map((image) => {
            return <img key={image.id} src={image.src} alt="Media" />;
          })}
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes["block-action"]}>
          <BlockIcon className={classes.block} />
          <p>Block</p>
        </div>
      </div>
    </Modal>
  );
}

export default ChatInfo;
