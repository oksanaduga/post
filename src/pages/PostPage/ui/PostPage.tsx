import classes from "./PostPage.module.scss";

import { RootState } from "@/app/store/store";
import { selectPostById } from "@/entities/Posts";
import {
  getPostsPageError,
  getPostsPageIsLoading,
} from "@/entities/Posts/model/selectors/posts";
import { selectUserById } from "@/entities/Users";
import { useSelector } from "react-redux";
import { redirect, useParams } from "react-router-dom";

export const PostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state: RootState) =>
    selectPostById(state, Number(postId))
  );
  const user = useSelector((state: RootState) =>
    selectUserById(state, post.userId)
  );
  const isLoading = useSelector(getPostsPageIsLoading);
  const error = useSelector(getPostsPageError);

  //TODO переход не через гл стр
  if (!post) {
    return redirect("/");
  }

  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <article className={classes.wrapper}>
      <h1>{post.title}</h1>
      <p>{user.name}</p>
      <div>{post.body}</div>
    </article>
  );
};
