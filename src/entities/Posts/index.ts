export {
  getPostsPage,
  getPostsPageError,
  getPostsPageIsLoading,
  getIsInit,
} from "./model/selectors/posts";

export {
  fetchPosts,
  selectAllPosts,
  selectPostById,
  postsPageActions,
} from "./model/slice/postsPageSlice";
