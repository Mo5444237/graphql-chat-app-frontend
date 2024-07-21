import Modal from "../UI/Modal";
import classes from "./ImagePreview.module.css";

function ImagePreview({ img, ...props }) {
  return (
    <Modal onClose={props.onHideModal} className={classes.modal}>
      <div className={classes.img}>
        <img src={img} alt="Image Preview" />
      </div>
    </Modal>
  );
}

export default ImagePreview;
