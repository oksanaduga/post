import { EntityId, EntityState } from "@reduxjs/toolkit";

import { Post } from "@/entities/Post";

export interface PostsPageSchema extends EntityState<Post, EntityId> {
  isLoading?: boolean;
  error?: string;
  page: number;
  limit: number;
  isInit: boolean;
}
