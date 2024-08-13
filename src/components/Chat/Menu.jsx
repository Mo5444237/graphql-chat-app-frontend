import classes from "./Menu.module.css";

import BurgerMenu from "../UI/BurgerMenu";
import DarkMode from "../UI/DarkMode";
import LogoutIcon from "../UI/LogoutIcon";
import MoonIcon from "../UI/MoonIcon";
import ProfileIcon from "../layout/ProfileIcon";

import { redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";

import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../services/auth";
import socket from "../../services/socket";

function Menu(props) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const openProfileHandler = () => {
    props.openProfile();
  };

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem("token");
      dispatch(userActions.clearUser());
      redirect("/auth?mode=login");
      socket.disconnect();
    },
  });

  return (
    <BurgerMenu className={classes.menu}>
      <ul>
        <li key={"profile"} onClick={openProfileHandler}>
          <ProfileIcon avatar={user?.avatar} />
          <p>{user?.name}</p>
        </li>
        <li key={"darkMode"}>
          <MoonIcon />
          <p>Night Mode</p>
          <DarkMode />
        </li>
        <li key={"logout"} onClick={logout}>
          <LogoutIcon />
          <p>Logout</p>
        </li>
      </ul>
    </BurgerMenu>
  );
}

export default Menu;
