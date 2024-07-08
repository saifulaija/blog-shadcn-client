// import { baseApi } from "./api/baseApi";

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from "redux-persist";
//   import storage from "redux-persist/lib/storage";
// import { store } from "./store";

//   const persistConfig = {
//     key: "root",
//     storage,
//   };

//   const persistedApproveReducer = persistReducer(persistConfig, approveReducer);
// //   const persistedReviewReducer = persistReducer(persistConfig, reviewReducer);
// //   const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
// export const reducer={
//     [baseApi.reducerPath]: baseApi.reducer,
//     theme:themeReducer,
//     approve:persistedApproveReducer
// }

// export const persistor = persistStore(store);
