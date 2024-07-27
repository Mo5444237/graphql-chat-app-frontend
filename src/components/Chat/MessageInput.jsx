import { useRef, useState } from "react";
import classes from "./MessageInput.module.css";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../../services/chat";
import socket from "../../services/socket";
import ImageViewer from "./ImagePicker";
import SendButton from "../UI/SendButton";
import { useDispatch, useSelector } from "react-redux";
import { chatsActions } from "../../store/chats-slice";

function MessageInput({ chatId, users }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [openModal, setOpenModal] = useState();
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: (data) => {
      const message = data.sendMessage;
      dispatch(chatsActions.updateUnsentMessages(message));
    },
  });

  const typingHandler = (e) => {
    setMessage(e.target.value);
    users.forEach((user) =>
      socket.emit("typing", {
        chatId,
        userId: user._id,
        user: { _id: currentUser._id, name: currentUser.name },
      })
    );
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message) return;
    const userIds = users.map((user) => user._id);
    const date = new Date().getTime().toString();

    const messageInput = {
      content: message,
      type: "text",
      chatId: chatId || "",
      users: userIds,
      createdAt: date,
    };

    dispatch(chatsActions.updateUnsentMessages(messageInput));
    setMessage("");
    try {
      await sendMessage({
        variables: { messageInput: messageInput },
      });
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

  const hideModalHandler = () => {
    setOpenModal(false);
    fileInputRef.current.value = "";
  };

  return (
    <div className={classes.contianer}>
      {openModal && (
        <ImageViewer
          image={image}
          onHideModal={hideModalHandler}
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
              ref={fileInputRef}
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
          <SendButton className={classes.SendButton} />
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
