import ChatIcon from "../UI/ChatIcon";
import LogoutIcon from "../UI/LogoutIcon";
import StatusIcon from "../UI/StatusIcon";
import classes from "./MainHeader.module.css";

import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header>
      <ul className={classes.links}>
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <ChatIcon className={classes.icon} />
        </NavLink>
        <NavLink
          to="status"
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <StatusIcon className={classes.icon} />
        </NavLink>
      </ul>
    </header>
  );
};

export default MainHeader;
