import classes from "./ProfileIcon.module.css";

function ProfileIcon({avatar}) {
  return (
    <div className={classes["profile-icon"]}>
      <img
        src={ avatar || "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740"}
        alt="profile icon"
      />
    </div>
  );
}

export default ProfileIcon;
