
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type approveItem = {
authorId:string | undefined,
name:string | undefined,
  message: string | undefined;
  status: string | undefined;
 
};

type InitialState = {
  statusItems:approveItem [];
};

const initialState: InitialState = {
  statusItems: [],
};

const approveSlice = createSlice({
  name: "approve",
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<approveItem>) => {
      state.statusItems.push(action.payload);
    },
    getStatus: (state, action: PayloadAction<approveItem[]>) => {
      state.statusItems = action.payload;
    },
    clearStatusItems: (state) => {
      state.statusItems = [];
    },
  },
});

export const { addStatus,getStatus,clearStatusItems} =
  approveSlice.actions;

export default approveSlice.reducer;
