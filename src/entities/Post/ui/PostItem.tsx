import classes from "./PostItem.module.scss";
// import classNames from 'classnames';

import { RootState } from "@/app/store/store";
import {
  getUsersError,
  getUsersIsLoading,
  selectUserById,
} from "@/entities/Users";
import { useSelector } from "react-redux";
import { Post } from "../types/post";
import { Link, redirect } from "react-router-dom";

interface PostItemProps {
  post: Post;
}
export const PostItem = (props: PostItemProps) => {
  const { post } = props;

  const user = useSelector((state: RootState) =>
    selectUserById(state, post.userId)
  );

  const isLoadingUser = useSelector(getUsersIsLoading);
  const error = useSelector(getUsersError);

  const userName = isLoadingUser ? (
    <div>loading</div>
  ) : Boolean(error) ? (
    <div>user name error</div>
  ) : (
    user.name
  );

  return (
    <Link to={`post/${post.id}`}>
      <div className={classes.wrapper}>
        <h2>{post.title}</h2>
        <p>author: {userName}</p>
      </div>
    </Link>
  );
};
