import classes from "./Profile.module.css";
import defaultImage from "../../assets/defaultImage.png";
import { useState } from "react";

import NewChatIcon from "../UI/NewChatIcon";
import BackIcon from "../UI/Backicon";
import EditProfile from "./EditProfile";
import BlockIcon from "../UI/BlockIcon";
import BlockList from "./BlockList";

import { useSelector } from "react-redux";

function Profile({ open, ...props }) {
  const user = useSelector((state) => state.user.user);
  const [openModal, setOpenModal] = useState();
  const [openBlockedModal, setOpenBlockedModal] = useState();

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const openBlockedModelHandler = () => {
    setOpenBlockedModal(true);
  };

  const closeBlockedModelHandler = () => {
    setOpenBlockedModal(false);
  };

  return (
    <div className={`${classes.profile} ${open ? classes.open : ""}`}>
      <div className={classes.head}>
        <BackIcon onClick={props.closeProfile} />
        <p>Profile</p>
      </div>
      <div className={classes.content}>
        <NewChatIcon className={classes.edit} onClick={openModalHandler} />
        {openModal && (
          <EditProfile onHideModal={closeModalHandler} user={user} />
        )}
        <div className={classes.avatar}>
          <div className={classes.img}>
            <img src={user?.avatar || defaultImage} alt="User-image" />
          </div>
          <p className={classes.name}>{user?.name}</p>
        </div>
        <div className={classes.tabs}>
          <BlockList
            open={openBlockedModal}
            blockedUsers={user?.blockedUsers || []}
            closeBlockedModal={closeBlockedModelHandler}
          />
          <div className={classes.block} onClick={openBlockedModelHandler}>
            <BlockIcon />
            <p>
              Blocked Users <span>({user?.blockedUsers?.length || 0})</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
