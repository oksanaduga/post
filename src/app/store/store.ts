import { configureStore } from "@reduxjs/toolkit";
import { postsPageReducer } from "@/entities/Posts/model/slice/postsPageSlice";
import { usersReducer } from "@/entities/Users/model/slice/usersSlice";

export const store = configureStore({
  reducer: {
    posts: postsPageReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkConfig<T> {
  rejectValue: T;
  state: RootState;
}
