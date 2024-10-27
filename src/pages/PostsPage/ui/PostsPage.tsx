import { useCallback } from "react";
import { useSelector } from "react-redux";

import { PostItem } from "@/entities/Post/ui/PostItem";
import {
  fetchPosts,
  getIsInit,
  getPostsPage,
  getPostsPageError,
  getPostsPageIsLoading,
  postsPageActions,
  selectAllPosts,
} from "@/entities/Posts";
import { Pagination } from "@/features/Pagination";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch";
import { Loader } from "@/shared/ui/Loader/Loader";

import classes from "./PostsPage.module.scss";

export const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(getPostsPageIsLoading);
  const error = useSelector(getPostsPageError);
  const page = useSelector(getPostsPage);
  const isInit = useSelector(getIsInit);

  const onChangePage = useCallback(
    (page: number) => {
      dispatch(postsPageActions.setPage(page));
      dispatch(fetchPosts());
    },
    [dispatch, fetchPosts]
  );

  if (error) {
    return <div>{error}</div>;
  }

  const isLoadingPosts = isLoading && posts.length === 0;
  const isEmpty = !isLoading && isInit && posts.length === 0;

  return (
    <div className={classes.text}>
      {isInit && (
        <Pagination
          currentPage={page}
          onPageChange={onChangePage}
          contentLength={posts.length}
        />
      )}
      {isLoadingPosts && (
        <div className={classes.loaderWrapper}>
          <Loader />
        </div>
      )}
      {isEmpty ? (
        <div>empty list</div>
      ) : (
        posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })
      )}
    </div>
  );
};
