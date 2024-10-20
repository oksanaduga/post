import {
  EntityId,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import { RootState, ThunkConfig } from "@/app/store/store";
import { User, UsersSchema } from "../types/users";

export const fetchUsers = createAsyncThunk<
  User[],
  number | undefined,
  ThunkConfig<string>
>("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("error");
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
