import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch";
import { Pagination } from "@/features/Pagination";
import { PostItem } from "@/entities/Post/ui/PostItem";
import classes from "./PostsPage.module.scss";
import {
  fetchPosts,
  getPostsPage,
  getPostsPageError,
  getPostsPageIsLoading,
  postsPageActions,
  selectAllPosts,
  getIsInit,
} from "@/entities/Posts";

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
      {isLoadingPosts && <div>loading</div>}
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
