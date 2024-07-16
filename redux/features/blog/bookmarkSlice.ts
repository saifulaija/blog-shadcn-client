import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '@/types/blog';

export type InitialState = {
  blogsItem: IBlog[];
  filteredBlogs: IBlog[];
};

const initialState: InitialState = {
  blogsItem: [],
  filteredBlogs: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmarked: (state, action: PayloadAction<IBlog>) => {
      const isExist = state.blogsItem.some(
        (item) => item.id === action.payload.id,
      );
      if (!isExist) {
        state.blogsItem.push(action.payload);
      }
    },

    getAllBookmarked: (state, action: PayloadAction<string | undefined>) => {
      const searchTerm = action.payload?.toLowerCase();
      if (searchTerm) {
        state.filteredBlogs = state.blogsItem.filter((blog) =>
          blog.title.toLowerCase().includes(searchTerm),
        );
      } else {
        state.filteredBlogs = state.blogsItem;
      }
    },

    cancelBookmarked: (state, action: PayloadAction<string>) => {
      const blogId = action.payload;
      const index = state.blogsItem.findIndex((item) => item.id === blogId);
      if (index !== -1) {
        state.blogsItem.splice(index, 1);
      }
    },
  },
});

export const { addBookmarked, getAllBookmarked, cancelBookmarked } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
