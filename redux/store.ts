
import { configureStore } from "@reduxjs/toolkit";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { baseApi } from "./api/baseApi";
import approveReducer from "./features/blog/approveSlice";
import blogSReducer from "./features/blog/blogSlice";


const persistConfig = {
  key: "root",
  storage,
};

const persistedApproveReducer = persistReducer(persistConfig, approveReducer);
const persistedBlogReducer = persistReducer(persistConfig, blogSReducer);
// const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    approve: persistedApproveReducer,
    blog:persistedBlogReducer
   
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

