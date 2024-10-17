"use client";

import React, { useEffect, useRef } from "react";

const Board = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv = canvasRef.current;
    const ctx = cnv.getContext("2d");
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
  }, []);

  return (
    // instead of id here we are using ref
    <canvas ref={canvasRef}></canvas>
  );
};

export default Board;
