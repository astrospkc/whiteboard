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

const Menu = () => {
  return (
    <div className={`${styles.menuContainer} shadow-md shadow-red-200 `}>
      {/* pencil, eraser, undo, redo, download */}
      <div className={styles.fontContainer}>
        <FontAwesomeIcon icon={faPencil} className={styles.iconWrapper} />
      </div>
      <div className={styles.fontContainer}>
        <FontAwesomeIcon icon={faEraser} className={styles.iconWrapper} />
      </div>
      <div className={styles.fontContainer}>
        <FontAwesomeIcon icon={faUndo} className={styles.iconWrapper} />
      </div>
      <div className={styles.fontContainer}>
        <FontAwesomeIcon icon={faRedo} className={styles.iconWrapper} />
      </div>
      <div className={styles.fontContainer}>
        <FontAwesomeIcon icon={faDownload} className={styles.iconWrapper} />
      </div>
    </div>
  );
};

export default Menu;
