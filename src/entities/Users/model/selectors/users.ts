import { RootState } from "@/app/store/store";

export const getUsersError = (state: RootState) => state.posts?.error;
export const getUsersIsLoading = (state: RootState) =>
  state.users?.isLoading || false;
