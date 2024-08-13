import classes from "./BlockList.module.css";

import BackIcon from "../UI/Backicon";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";

import { useMutation } from "@apollo/client";
import { UNBLOCK_USER_MUTATION } from "../../services/auth";

function BlockList({ blockedUsers, open, ...props }) {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [unBlockUser, { loading }] = useMutation(UNBLOCK_USER_MUTATION, {
    onCompleted: (data) => {
      dispatch(userActions.setBlockList(data.unblockUser));
    },
  });

  const unBlockHandler = async (userId) => {
    if (!userId) return;

    try {
      await unBlockUser({
        variables: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const content = blockedUsers.map((user) => (
    <li className={classes.user} key={user._id}>
      <p>{`${contacts[user._id] ? contacts[user._id].name : user.name}`}</p>
      <button
        className={classes.unblock}
        onClick={unBlockHandler.bind(null, user._id)}
      >
        Unblock
      </button>
    </li>
  ));

  return (
    <div className={`${classes.blocks} ${open ? classes.open : null}`}>
      <div className={classes.head}>
        <BackIcon onClick={props.closeBlockedModal} />
        <p>Blocked Users</p>
      </div>
      {content.length > 0 ? (
        <ul className={classes.content}>{content}</ul>
      ) : (
        <p className={classes.center}>no blocked users</p>
      )}
    </div>
  );
}

export default BlockList;
