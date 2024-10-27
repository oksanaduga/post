import { RootState } from "@/app/store/store";

export const getUserError = (state: RootState) => state.user?.error;
export const getUserIsLoading = (state: RootState) =>
  state.user?.isLoading || false;
export const getUser = (state: RootState) => state.user.user ?? undefined;
