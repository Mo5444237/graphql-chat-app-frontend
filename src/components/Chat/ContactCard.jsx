import classes from "./ContactCard.module.css";
import defaultImage from "../../assets/defaultImage.png";

function ContactCard({ contact, ...props }) {
  return (
    <div className={`${classes.contact} ${props.className}`} onClick={props.onClick}>
      <div className={classes.avatar}>
        <img src={contact.avatar || defaultImage} alt="User Image" />
      </div>
      <p className={classes.name}>{contact.name}</p>
    </div>
  );
}

export default ContactCard;
