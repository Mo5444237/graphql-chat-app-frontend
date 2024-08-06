import classes from "./ChatInfo.module.css";

import { useState } from "react";
import Modal from "../UI/Modal";
import CancelIcon from "../UI/CancelIcon";
import BlockIcon from "../UI/BlockIcon";

import defaultImage from "../../assets/defaultImage.png";
import ImagePreview from "./ImagePreview";
import EditGroup from "./EditGroup";
import NewChatIcon from "../UI/NewChatIcon";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { BLOCK_USER_MUTATION } from "../../services/auth";
import { userActions } from "../../store/user-slice";
import GroupIcon from "../UI/GroupIcon";
import { DELETE_USER_FROM_CHAT } from "../../services/chat";
import AddMembers from "./AddMembers";

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const userId = useSelector((state) => state.user.user._id);
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const isPrivate = chatData.type === "private";
  const chatUser =
    isPrivate && chatData.users.find((user) => user._id !== userId);
  const isAdmin = chatData?.admin === userId;

  const media = images.map((image) => {
    return <img key={image.id} src={image.src} alt="Media" />;
  });

  const [blockUser] = useMutation(BLOCK_USER_MUTATION, {
    onCompleted: (data) => {
      dispatch(userActions.setBlockList(data.blockUser));
    },
  });

  const blockUserHandler = async (userId) => {
    if (!userId) return;

    try {
      await blockUser({
        variables: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [removeUser] = useMutation(DELETE_USER_FROM_CHAT);

  const removeUserHandler = async (userId) => {
    console.log(userId);
    if (!userId || !chatData._id) return;

    try {
      await removeUser({
        variables: {
          chatInput: {
            userId,
            chatId: chatData._id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModalHandler = () => {
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setOpenEditModal(false);
  };

  const openAddMembersModalHandler = () => {
    console.log("Clicked");
    setOpenAddModal(true);
  };

  const closeAddMembersModalHandler = () => {
    setOpenAddModal(false);
  };

  const members = chatData.users.map((user) => {
    if (user._id === userId) return;
    return (
      <div className={classes.user} key={user._id}>
        <div className={classes.img}>
          <img src={user.avatar || defaultImage} alt="user" />
        </div>
        <p>{contacts[user._id] ? contacts[user._id].name : user.name}</p>
        {isAdmin && (
          <p
            className={classes.remove}
            onClick={removeUserHandler.bind(null, user._id)}
          >
            Remove
          </p>
        )}
      </div>
    );
  });

  return (
    <>
      <Modal className={classes.modal} onClose={props.onHideChatInfo}>
        {openAddModal && (
          <AddMembers
            closeAddModal={closeAddMembersModalHandler}
            currentMembers={chatData.users}
            chatId={chatData._id}
          />
        )}
        <div className={classes.header}>
          <h2>Chat Details</h2>
          <CancelIcon
            className={classes.cancel}
            onClick={props.onHideChatInfo}
          />
        </div>
        <div className={classes.chat}>
          {isAdmin && (
            <NewChatIcon
              className={classes.edit}
              onClick={openEditModalHandler}
            />
          )}
          {openEditModal && (
            <EditGroup onHideModal={closeEditModalHandler} chat={chatData} />
          )}
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
          <div className={classes.images}>{media}</div>
        </div>
        <div className={classes.members}>
          <h3>Members</h3>
          <div className={classes.users}>
            {isAdmin && (
              <div className={classes.add} onClick={openAddMembersModalHandler}>
                <GroupIcon />
                <p>Add Members</p>
              </div>
            )}
            {members}
          </div>
        </div>
        <div className={classes.actions}>
          {isPrivate && (
            <div
              className={classes["block-action"]}
              onClick={blockUserHandler.bind(null, chatUser._id)}
            >
              <BlockIcon className={classes.block} />
              <p>Block</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ChatInfo;
