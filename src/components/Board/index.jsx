"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants";

import { actionItemClick } from "../../lib/features/menu/menuSlice";
import { socket } from "../../socket";

const Board = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  // const actionMenuItem = useSelector((state) => state.menu.actionMenuItem);

  // const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  console.log("color, size: ", color, size);
  // UNDO , REDO, DOWNLOAD
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    console.log("actionMenuItem: ", actionMenuItem);
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      console.log(URL);
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
        historyPointer.current -= 1;
      }
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      ) {
        historyPointer.current += 1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      ctx.putImageData(imageData, 0, 0);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  // BRUSH SIZE AND COLOR
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      console.log("config", config);
      changeConfig(config.color, config.size);
    };

    changeConfig(color, size);
    socket.on("changeConfig", handleChangeConfig);

    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);

  // useLayoutEffect works before the useEffect runs, before the paint happens this hooks run

  useLayoutEffect(() => {
    // console.log("canvas ref: ", canvasRef.current);
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      // console.log(`Begin path at (${x}, ${y})`);
    };

    const drawLine = (x, y) => {
      ctx.lineTo(x, y);
      ctx.stroke();
      // console.log(`Draw line to (${x}, ${y})`);
    };

    const handleMouseDown = (e) => {
      console.log("mouse down");
      shouldDraw.current = true;

      beginPath(
        e.clientX,
        e.clientY
        // e.clientX || e.touches[0].clientX,
        // e.clientY || e.touches[0].clientY
      );
      socket.emit("beginPath", {
        x: e.clientX,
        y: e.clientY,
        // x: e.clientX || e.touches[0].clientX,
        // y: e.clientY || e.touches[0].clientY,
      });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(
        e.clientX,
        e.clientY
        // e.clientX || e.touches[0].clientX,
        // e.clientY || e.touches[0].clientY
      );
      socket.emit("drawLine", {
        x: e.clientX,
        y: e.clientY,
        // x: e.clientX || e.touches[0].clientX,
        // y: e.clientY || e.touches[0].clientY,
      });
    };

    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const handleBeginPath = (path) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // canvas.addEventListener("touchstart", handleMouseDown);
    // canvas.addEventListener("touchmove", handleMouseMove);
    // canvas.addEventListener("touchend", handleMouseUp);
    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      // canvas.removeEventListener("touchstart", handleMouseDown);
      // canvas.removeEventListener("touchmove", handleMouseMove);
      // canvas.removeEventListener("touchend", handleMouseUp);

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, []);
  return (
    // instead of id here we are using ref
    <canvas ref={canvasRef}></canvas>
  );
};

export default Board;
