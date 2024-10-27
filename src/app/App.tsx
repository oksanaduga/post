import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { fetchPosts } from "@/entities/Posts/model/slice/postsPageSlice";
import { PostPage } from "@/pages/PostPage";
import { PostsPage } from "@/pages/PostsPage";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={"post/:postId"} element={<PostPage />} />
      <Route path={"/"} element={<PostsPage />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};
