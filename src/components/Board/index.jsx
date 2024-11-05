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
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  // UNDO , REDO, DOWNLOAD
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
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

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const beginPath = (x, y) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
    };
    const drawLine = (x, y) => {
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );
      socket.emit("beginPath", {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );
      socket.emit("drawLine", {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
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

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);
    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawLine);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);

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
