import {useSelector } from "react-redux";
import classes from "./Profile.module.css";

import defaultImage from "../../assets/defaultImage.png";
import NewChatIcon from "../UI/NewChatIcon";
import BackIcon from "../UI/Backicon";
import { useState } from "react";
import EditProfile from "./EditProfile";

function Profile({ open, ...props }) {
  const user = useSelector((state) => state.user.user);
  const [openModal, setOpenModal] = useState();

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className={`${classes.profile} ${open ? classes.open : ""}`}>
      <div className={classes.head}>
        <BackIcon onClick={props.closeProfile} />
        <p>Profile</p>
      </div>
      <div className={classes.content}>
        <NewChatIcon className={classes.edit} onClick={openModalHandler} />
        {openModal && <EditProfile onHideModal={closeModalHandler} user={user}/>}
        <div className={classes.avatar}>
          <div className={classes.img}>
            <img src={user?.avatar || defaultImage} alt="User-image" />
          </div>
          <p className={classes.name}>{user?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
