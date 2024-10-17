import React from "react";
import { COLORS } from "../../constants";
import styles from "../ToolBox/styles.module.css";
const ToolBox = () => {
  return (
    <div className="exo-2-regular absolute top-1/4 left-5 w-70 rounded-md  p-3 shadow-md shadow-red-200">
      <div className="mb-5">
        <h1>Stroke Color</h1>
        <div className={`${styles.itemContainer} flex flex-row gap-2`}>
          <div className="bg-red-700 h-5 w-5" />
          <div className="bg-blue-700 h-5 w-5" />
          <div className="bg-green-700 h-5 w-5" />
          <div className="bg-yellow-700 h-5 w-5" />
          <div className="bg-violet-700 h-5 w-5" />
          <div className="bg-indigo-700 h-5 w-5" />
          <div className="bg-orange-700 h-5 w-5" />
          <div className="bg-white h-5 w-5" />
        </div>
      </div>

      {/* <h4 className={styles.toolText}>Brush Size</h4>
       */}
      <h1>Brush size</h1>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          //   onChange={updateBrushSize}
          //   value={size}
        />
      </div>
    </div>
  );
};

export default ToolBox;
