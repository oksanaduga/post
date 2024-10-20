import { Post } from "@/entities/Post";
import { EntityId, EntityState } from "@reduxjs/toolkit";

export interface PostsPageSchema extends EntityState<Post, EntityId> {
  isLoading?: boolean;
  error?: string;
  page: number;
  limit: number;
  isInit: boolean;
}
