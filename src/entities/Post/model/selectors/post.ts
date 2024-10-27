import { RootState } from "@/app/store/store";

export const getPostIsLoading = (state: RootState) =>
  state.post?.isLoading || false;
export const getPostError = (state: RootState) => state.post?.error;
export const getPost = (state: RootState) => state.post?.post ?? undefined;
