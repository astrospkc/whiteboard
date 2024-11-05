"use client";
import React from "react";
import { COLORS, MENU_ITEMS } from "../../constants";
import styles from "../ToolBox/styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import {
  changeBrushSize,
  changeColor,
} from "../../lib/features/toolbox/toolSlice";
import { socket } from "../../socket";
const ToolBox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const dispatch = useDispatch();
  const showStroke = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrush = activeMenuItem === MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER;
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  const updateBrushSize = (e) => {
    console.log("value: ", e.target.value);
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    socket.emit("changeConfig", { color, size: e.target.value });
  };
  const updateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    socket.emit("changeConfig", { color: newColor, size });
  };

  return (
    <div className="exo-2-regular absolute top-1/4 left-5 w-70 rounded-md  p-3 shadow-md shadow-red-200">
      {showStroke && (
        <div className="mb-5">
          <h1>Stroke Color</h1>
          <div className={`${styles.itemContainer} flex flex-row gap-2`}>
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.WHITE,
              })}
              style={{ backgroundColor: COLORS.WHITE }}
              onClick={() => updateColor(COLORS.WHITE)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.VIOLET,
              })}
              style={{ backgroundColor: COLORS.VIOLET }}
              onClick={() => updateColor(COLORS.VIOLET)}
            />
            <div
              className={classNames("h-5 w-5 active:opacity-80", {
                "ring-2 ring-red-300": color === COLORS.INDIGO,
              })}
              style={{ backgroundColor: COLORS.INDIGO }}
              onClick={() => updateColor(COLORS.INDIGO)}
            />
          </div>
        </div>
      )}

      {/* <h4 className={styles.toolText}>Brush Size</h4>
       */}
      {showBrush && (
        <div>
          <h1>Brush size</h1>
          <div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
              defaultValue={size}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
