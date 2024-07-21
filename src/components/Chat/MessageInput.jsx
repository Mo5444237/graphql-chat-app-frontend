import { useState } from "react";
import classes from "./MessageInput.module.css";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../../services/chat";
import socket from "../../services/socket";
import ImageViewer from "./ImagePicker";
import SendButton from "../UI/SendButton";

function MessageInput({ chatId, users }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState("");
  const [openModal, setOpenModal] = useState();
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE_MUTATION);

  const typingHandler = (e) => {
    setMessage(e.target.value);
    users.forEach((user) =>
      socket.emit("typing", { chatId, userId: user._id || user })
    );
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message) return;
    const userIds = users.map((user) => user._id);
    const messageInput = {
      content: message,
      type: "text",
      chatId: chatId || "",
      users: userIds,
    };

    try {
      await sendMessage({
        variables: { messageInput: messageInput },
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const fileUploadHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setOpenModal(true);
  };

  return (
    <div className={classes.contianer}>
      {openModal && (
        <ImageViewer
          image={image}
          onHideModel={() => setOpenModal(false)}
          chatId={chatId}
          users={users}
        />
      )}
      <form onSubmit={sendMessageHandler}>
        <div className={classes.messageBox}>
          <div className={classes.fileUploadWrapper}>
            <label htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 337 337"
              >
                <circle
                  strokeWidth="20"
                  stroke="#6c6c6c"
                  fill="none"
                  r="158.5"
                  cy="168.5"
                  cx="168.5"
                ></circle>
                <path
                  strokeLinecap="round"
                  strokeWidth="25"
                  stroke="#6c6c6c"
                  d="M167.759 79V259"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="25"
                  stroke="#6c6c6c"
                  d="M79 167.138H259"
                ></path>
              </svg>
            </label>
            <input
              type="file"
              id="file"
              className={classes.file}
              name="file"
              onChange={fileUploadHandler}
            />
          </div>
          <input
            required=""
            placeholder="Message..."
            type="text"
            id="messageInput"
            value={message}
            onInput={typingHandler}
            className={classes.messageInput}
          />
          <SendButton className={classes.SendButton} disabled={loading} />
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
