import { useDispatch, useSelector } from "react-redux";
import BurgerMenu from "../UI/BurgerMenu";
import DarkMode from "../UI/DarkMode";
import LogoutIcon from "../UI/LogoutIcon";
import MoonIcon from "../UI/MoonIcon";
import ProfileIcon from "../layout/ProfileIcon";

import classes from "./Menu.module.css";
import { redirect } from "react-router-dom";
import { userActions } from "../../store/user-slice";

function Menu() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userActions.clearUser());
    redirect('/auth?mode=login');  
  };
  return (
    <BurgerMenu className={classes.menu}>
      <ul>
        <li key={"profile"}>
          <ProfileIcon />
          <p>{user?.name}</p>
        </li>
        <li key={"darkMode"}>
          <MoonIcon />
          <p>Night Mode</p>
          <DarkMode />
        </li>
        <li key={"logout"} onClick={logoutHandler}>
          <LogoutIcon />
          <p>Logout</p>
        </li>
      </ul>
    </BurgerMenu>
  );
}

export default Menu;
