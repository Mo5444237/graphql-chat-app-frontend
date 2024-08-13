import classes from "./ProfileIcon.module.css";
import defaultImage from "../../assets/defaultImage.png";

function ProfileIcon({ avatar }) {
  return (
    <div className={classes["profile-icon"]}>
      <img src={avatar || defaultImage} alt="profile icon" />
    </div>
  );
}

export default ProfileIcon;
