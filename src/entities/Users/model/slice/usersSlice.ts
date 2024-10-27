import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { RootState, ThunkConfig } from "@/app/store/store";
import { User } from "@/entities/User/model/types/user";

import { UsersSchema } from "../types/users";

export const fetchUsers = createAsyncThunk<
  User[],
  number[],
  ThunkConfig<string>
>("users/fetchUsers", async (ids, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const usersPromises: Promise<AxiosResponse<User>>[] = [];

    for (const id of ids) {
      const request = extra.api.get(`/usersxd/${id}`);
      usersPromises.push(request);
    }

    const usersResponse = await Promise.allSettled(usersPromises);
    const fulfilledResults: User[] = [];

    usersResponse.forEach((result) => {
      if (result.status === "fulfilled") {
        fulfilledResults.push(result.value.data);
      } else {
        console.error("Error:", result.reason);
      }
    });

    return fulfilledResults;
  } catch (error) {
    console.log(error);
    return rejectWithValue("error");
  }
});

const initialState: UsersSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
};

export const usersAdapter = createEntityAdapter<User, EntityId>({
  selectId: (user) => user.id,
});

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users
);

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersSchema) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersSchema, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          usersAdapter.setAll(state, action.payload);
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: usersReducer } = usersSlice;
