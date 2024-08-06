import classes from "./GroupMember.module.css";
import defaultImage from "../../assets/defaultImage.png";
import CheckBox from "../UI/CheckBox";

function GroupMember({ contact, ...props }) {
  return (
    <div className={classes.contacts}>
      <div className={classes.contact}>
        <div className={classes.avatar}>
          <img src={contact.avatar || defaultImage} alt="User Image" />
        </div>
        <p className={classes.name}>{contact.name}</p>
      </div>
      <CheckBox onClick={() => props.toggleUserHandler(contact._id)} />
    </div>
  );
}

export default GroupMember;
