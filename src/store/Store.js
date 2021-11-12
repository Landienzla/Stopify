import { configureStore } from "@reduxjs/toolkit";
import stopifyReducer from './stopifySlice'
export default configureStore({
    reducer: {
      userData: stopifyReducer,
    },
  });