import BurgerMenu from "../UI/BurgerMenu";
import DarkMode from "../UI/DarkMode";
import LogoutIcon from "../UI/LogoutIcon";
import MoonIcon from "../UI/MoonIcon";
import ProfileIcon from "../layout/ProfileIcon";

import classes from "./Menu.module.css";

function Menu() {
  return (
    <BurgerMenu className={classes.menu}>
      <ul>
        <li key={"profile"}>
          <ProfileIcon />
          <p>Jone Doe</p>
              </li>
              <li key={"darkMode"}>
                  <MoonIcon />
                  <p>Night Mode</p>
                  <DarkMode />
              </li>
        <li key={"logout"}>
          <LogoutIcon />
          <p>Logout</p>
        </li>
      </ul>
    </BurgerMenu>
  );
}

export default Menu;
