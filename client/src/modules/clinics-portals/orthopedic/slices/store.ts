import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./combineReducers";

const store = configureStore({
  reducer: rootReducer,
  
});

export default store;
