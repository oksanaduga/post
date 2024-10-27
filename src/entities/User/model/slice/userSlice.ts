import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";

import { ThunkConfig } from "@/app/store/store";

import { User, UserSchema } from "../types/user";

export const fetchUser = createAsyncThunk<User, number, ThunkConfig<string>>(
  "user/fetchUser",
  async (id, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.get(`/users/${id}`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("error");
    }
  }
);

const initialState: UserSchema = {
  isLoading: false,
  error: undefined,
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserSchema) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state: UserSchema, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: userReducer } = userSlice;
