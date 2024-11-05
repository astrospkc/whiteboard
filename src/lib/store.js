"use client";
import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./features/menu/menuSlice";
import ToolBoxReducer from "./features/toolbox/toolSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      menu: MenuReducer,
      toolbox: ToolBoxReducer,
    },
  });
};
