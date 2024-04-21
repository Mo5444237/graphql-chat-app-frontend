import { useState } from "react";
import classes from "./BurgerMenu.module.css";

function BurgerMenu(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.container}>
      <input
        id="toggleChecker"
        className={classes["toggleChecker"]}
        type="checkbox"
      />
      <label
        id="togglerLable"
        className={classes["togglerLable"]}
        htmlFor="toggleChecker"
      >
        <div className={classes.checkboxtoggler} onClick={toggleMenu}>
          <div className={classes["line-1"]}></div>
          <div className={classes["line-2"]}></div>
          <div className={classes["line-3"]}></div>
        </div>
      </label>
      <div
        className={`${classes.menu} ${menuOpen ? classes.show : null} ${
          props.className
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default BurgerMenu;
