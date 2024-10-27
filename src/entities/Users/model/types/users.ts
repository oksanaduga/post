import { EntityId, EntityState } from "@reduxjs/toolkit";

import { User } from "@/entities/User/model/types/user";

export interface UsersSchema extends EntityState<User, EntityId> {
  isLoading?: boolean;
  error?: string;
}
