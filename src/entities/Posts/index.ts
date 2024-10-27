export {
  getIsInit,
  getPostsPage,
  getPostsPageError,
  getPostsPageIsLoading,
} from "./model/selectors/posts";
export {
  fetchPosts,
  postsPageActions,
  selectAllPosts,
  selectPostById,
} from "./model/slice/postsPageSlice";
