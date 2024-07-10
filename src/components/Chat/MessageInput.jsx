import { useState } from "react";
import classes from "./MessageInput.module.css";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../../services/chat";
import socket from "../../services/socket";

function MessageInput({ chatId, users }) {
  const [message, setMessage] = useState("");
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE_MUTATION);
  console.log(users);
  const typingHandler = (e) => {
    setMessage(e.target.value);
    users.forEach((user) =>
      socket.emit("typing", { chatId, userId: user._id || user})
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
      const { data } = await sendMessage({
        variables: { messageInput: messageInput },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
            <span className={classes.tooltip}>Add an image</span>
          </label>
          <input type="file" id="file" className={classes.file} name="file" />
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
        <button
          id="sendButton"
          className={classes.sendButton}
          title="Send Message"
          type="submit"
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 664 663"
          >
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
