


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BlogItem = {
  name: string | undefined;
  message: string | undefined;
  category: string | undefined;
};

type approveItem = BlogItem; // Using BlogItem type for approveItem

type InitialState = {
  blogItems: BlogItem[];
};

const initialState: InitialState = {
  blogItems: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<approveItem>) => {
      state.blogItems.push(action.payload);
    },
    getBlog: (state, action: PayloadAction<approveItem[]>) => {
      state.blogItems = action.payload;
    },
    clearBlogItems: (state) => {
      state.blogItems = [];
    },
  },
});

export const { addBlog, getBlog, clearBlogItems } = blogSlice.actions;

export default blogSlice.reducer;

