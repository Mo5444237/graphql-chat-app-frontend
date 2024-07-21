import { useState } from "react";
import classes from "./ImagePicker.module.css";
import Input from "../UI/Input";
import SendButton from "../UI/SendButton";
import { SEND_MESSAGE_MUTATION } from "../../services/chat";
import { useMutation } from "@apollo/client";
import Spinner from "../UI/Spinner";

function ImageViewer({ image, chatId, users, ...props }) {
  const [caption, setCaption] = useState("");
  const [previewURL, setPreviewURL] = useState("");

  const captionChangeHandler = (e) => {
    setCaption(e.target.value);
  };

  if (image) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(image);
  }

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: () => {
      props.onHideModel();
      setCaption("");
    },
  });

  const sendImageHandler = async (e) => {
    e.preventDefault();
    if (!image) return;
    const userIds = users.map((user) => user._id);
    const messageInput = {
      content: "",
      type: "image",
      caption,
      image,
      chatId: chatId || "",
      users: userIds,
    };

    try {
      await sendMessage({
        variables: { messageInput: messageInput },
        context: {
          headers: {
            "x-apollo-operation-name": "SendMessage",
            "apollo-require-preflight": true,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={classes.overlay} onClick={props.onHideModel} />
      <div className={classes["image-preview"]}>
        <form onSubmit={sendImageHandler}>
          <div className={classes.preview}>
            <img src={previewURL} alt="Image Preview" />
          </div>
          <Input
            className={classes.input}
            label="caption"
            input={{
              id: "caption",
              name: "caption",
              placeholder: "caption",
              type: "text",
              value: caption,
              onChange: captionChangeHandler,
            }}
            errorMsg="Enter a valid Caption"
          />
          {loading ? <Spinner className={classes.loader} /> :
            <SendButton className={classes.sendButton} disabled={loading} />}
        </form>
      </div>
    </>
  );
}

export default ImageViewer;
