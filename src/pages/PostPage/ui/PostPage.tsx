import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getPost,
  getPostError,
  getPostIsLoading,
} from "@/entities/Post/model/selectors/post";
import { fetchPost } from "@/entities/Post/model/slice/postSlice";
import { getUser } from "@/entities/User";
import { RANDOM_PICTURE } from "@/shared/constants";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch/useAppDispatch";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { Loader } from "@/shared/ui/Loader/Loader";

import classes from "./PostPage.module.scss";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useAppDispatch();

  const post = useSelector(getPost);
  const user = useSelector(getUser);
  const isLoading = useSelector(getPostIsLoading);
  const error = useSelector(getPostError);

  useEffect(() => {
    dispatch(fetchPost(postId as string));
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loaderWrapper}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <article className={classes.wrapper}>
      <h1>{post?.title}</h1>
      <AppImage src={`${RANDOM_PICTURE}${post?.id}`} />
      <p>{user?.name}</p>
      <div>{post?.body}</div>
    </article>
  );
};
