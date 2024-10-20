import { getPostsPageError, getPostsPageIsLoading } from "@/entities/Posts";
import { fetchPosts } from "@/entities/Posts/model/slice/postsPageSlice";
import { PostPage } from "@/pages/PostPage";
import { PostsPage } from "@/pages/PostsPage";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Routes>
      {/* TODO: remove redirect */}
      {/* @ts-ignore */}
      <Route path={"post/:postId"} element={<PostPage />} />
      <Route path={"/"} element={<PostsPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};
