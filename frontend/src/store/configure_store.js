import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/authSlice";
import newsReducer from "../slices/news/newsSlice";
import mainApi from "./middleware/mainApi";
import summaryApi from "./middleware/summaryApi";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          mainApi,
          summaryApi
        }
      }
    })
});

