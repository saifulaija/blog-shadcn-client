// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export type approveItem = {
//   authorId: string | undefined;
//   message: string | undefined;
//   status: 'APPROVED' | 'CANCEL';
// };

// export type InitialState = {
//   statusItems: approveItem[];
// };

// const initialState: InitialState = {
//   statusItems: [],
// };

// const approveSlice = createSlice({
//   name: 'approve',
//   initialState,
//   reducers: {
//     addStatus: (state, action: PayloadAction<approveItem>) => {
//       state.statusItems.push(action.payload);
//     },
//     setStatusItems: (state, action: PayloadAction<approveItem[]>) => {
//       state.statusItems = action.payload;
//     },
//     clearStatusItems: (state) => {
//       state.statusItems = [];
//     },
//     getStatusByAuthorId: (state, action: PayloadAction<string | undefined>) => {
//       state.statusItems = state.statusItems.filter(
//         (item) => item.authorId === action.payload,
//       );
//     },
//   },
// });

// export const {
//   addStatus,
//   setStatusItems,
//   clearStatusItems,
//   getStatusByAuthorId,
// } = approveSlice.actions;

// export default approveSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ApproveItem = {
  authorId: string | undefined;
  message: string | undefined;
  status: 'APPROVED' | 'CANCEL';
};

export type InitialState = {
  statusItems: ApproveItem[];
};

const initialState: InitialState = {
  statusItems: [],
};

const approveSlice = createSlice({
  name: 'approve',
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<ApproveItem>) => {
      state.statusItems.push(action.payload);
    },
    setStatusItems: (state, action: PayloadAction<ApproveItem[]>) => {
      state.statusItems = action.payload;
    },
    clearStatusItems: (state) => {
      state.statusItems = [];
    },
    getStatusByAuthorId: (state, action: PayloadAction<string | undefined>) => {
      state.statusItems = state.statusItems.filter(
        (item) => item.authorId === action.payload,
      );
    },
  },
});

export const {
  addStatus,
  setStatusItems,
  clearStatusItems,
  getStatusByAuthorId,
} = approveSlice.actions;

export default approveSlice.reducer;
