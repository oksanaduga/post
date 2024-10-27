import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@/app/store/store";
import {
  getUsersError,
  getUsersIsLoading,
  selectUserById,
} from "@/entities/Users";
import { RANDOM_PICTURE } from "@/shared/constants";
import { AppImage } from "@/shared/ui/AppImage/AppImage";

import { Post } from "../model/types/post";
import classes from "./PostItem.module.scss";

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

  //TODO
  const userName = isLoadingUser ? (
    <div>loading</div>
  ) : error ? (
    <div>user name error</div>
  ) : (
    <p>author: {user?.name ?? ""}</p>
  );

  return (
    <Link to={`post/${post.id}`}>
      <div className={classes.wrapper}>
        <h2>{post.title}</h2>
        <AppImage src={`${RANDOM_PICTURE}${post?.id}`} />
        {userName}
      </div>
    </Link>
  );
};
