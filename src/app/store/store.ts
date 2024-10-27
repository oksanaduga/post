import { configureStore } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

import { postReducer } from "@/entities/Post/model/slice/postSlice";
import { postsPageReducer } from "@/entities/Posts/model/slice/postsPageSlice";
import { userReducer } from "@/entities/User/model/slice/userSlice";
import { usersReducer } from "@/entities/Users/model/slice/usersSlice";
import { api } from "@/shared/api/api";

export const store = configureStore({
  reducer: {
    post: postReducer,
    posts: postsPageReducer,
    user: userReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkConfig<T> {
  rejectValue: T;
  state: RootState;
  extra: { api: AxiosInstance };
}
