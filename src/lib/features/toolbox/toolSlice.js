"use client";
import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MENU_ITEMS } from "../../../constants";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

export const toolSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      console.log("payload color: ", state[action.payload.item].color);
      // const tool = state[action.payload.item];

      // if (tool) {
      //   tool.color = action.payload.color;
      // }
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      console.log("payload size: ", action.payload.item); // undefined
      state[action.payload.item].size = action.payload.size;
      // const tool = state[action.payload.item];
      // if (tool && "size" in tool) {
      //   // Check if 'size' property exists
      //   tool.size = action.payload.size;
      // } else {
      //   console.warn(
      //     `Tool ${action.payload.item} does not have a size property.`
      //   );
      // }
    },
  },
});

export const { changeColor, changeBrushSize } = toolSlice.actions;
export default toolSlice.reducer;
