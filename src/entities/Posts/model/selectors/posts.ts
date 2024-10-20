import { RootState } from "@/app/store/store";

export const getPostsPageIsLoading = (state: RootState) =>
  state.posts?.isLoading || false;
export const getPostsPageError = (state: RootState) => state.posts?.error;
export const getPostsPage = (state: RootState) => state.posts?.page || 1;
export const getIsInit = (state: RootState) => state.posts?.isInit || false;
