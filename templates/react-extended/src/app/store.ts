import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { rootEpic, epicMiddleware } from "./rootEpic";

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    epicMiddleware,
  ],
  devTools: process.env.NODE_ENV !== "production",
});

epicMiddleware.run(rootEpic);

export default store;
