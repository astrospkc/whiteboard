"use client";
import React from "react";
import styles from "../Menu/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faUndo,
  faRedo,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { MENU_ITEMS } from "../../constants";
import {
  actionItemClick,
  menuItemClick,
} from "../../lib/features/menu/menuSlice";
import cx from "classnames";

const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };
  const handleActionItemClick = (itemName) => {
    console.log("action item: ", itemName);
    dispatch(actionItemClick(itemName));
  };

  return (
    <div className={`${styles.menuContainer} shadow-md shadow-red-200 `}>
      {/* pencil, eraser, undo, redo, download */}
      <div
        className={cx(styles.iconWrapper, {
          "active:opacity-1 ring-2 ring-blue-200 p-3":
            activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          "active:opacity-1 ring-2 ring-blue-200 p-3":
            activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faUndo} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRedo} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faDownload} />
      </div>
    </div>
  );
};

export default Menu;
